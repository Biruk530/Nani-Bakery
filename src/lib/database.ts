import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Database connection configuration
const dbConfig = {
  host: import.meta.env.DB_HOST || 'localhost',
  user: import.meta.env.DB_USER || 'root',
  password: import.meta.env.DB_PASSWORD || '',
  database: import.meta.env.DB_NAME || 'nani_bakery',
  port: parseInt(import.meta.env.DB_PORT || '3306'),
};

// Create connection pool
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Database helper functions
export const db = {
  // Connection test
  async testConnection() {
    try {
      const connection = await pool.getConnection();
      await connection.ping();
      connection.release();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Users/Profiles
  async createUser(email: string, password: string, fullName: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await pool.execute(
        'INSERT INTO profiles (email, password, full_name) VALUES (?, ?, ?)',
        [email, hashedPassword, fullName]
      );
      return { success: true, userId: (result as any).insertId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async authenticateUser(email: string, password: string) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM profiles WHERE email = ?',
        [email]
      );
      const users = rows as any[];
      
      if (users.length === 0) {
        return { success: false, error: 'User not found' };
      }

      const user = users[0];
      const isValidPassword = await bcrypt.compare(password, user.password);
      
      if (!isValidPassword) {
        return { success: false, error: 'Invalid password' };
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email, isAdmin: user.is_admin },
        import.meta.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      return { 
        success: true, 
        user: { 
          id: user.id, 
          email: user.email, 
          fullName: user.full_name,
          isAdmin: user.is_admin 
        }, 
        token 
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getProfile(userId: number) {
    try {
      const [rows] = await pool.execute(
        'SELECT id, email, full_name, phone, address, city, postal_code, is_admin, created_at FROM profiles WHERE id = ?',
        [userId]
      );
      const users = rows as any[];
      return { success: true, data: users[0] || null };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async updateProfile(userId: number, updates: any) {
    try {
      const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
      const values = Object.values(updates);
      values.push(userId);

      await pool.execute(
        `UPDATE profiles SET ${fields}, updated_at = NOW() WHERE id = ?`,
        values
      );
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Categories
  async getCategories() {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM categories WHERE is_active = 1 ORDER BY sort_order'
      );
      return { success: true, data: rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Products
  async getProducts(categoryId?: number) {
    try {
      let query = `
        SELECT p.*, c.name as category_name 
        FROM products p 
        LEFT JOIN categories c ON p.category_id = c.id 
        WHERE p.is_available = 1
      `;
      const params: any[] = [];

      if (categoryId) {
        query += ' AND p.category_id = ?';
        params.push(categoryId);
      }

      query += ' ORDER BY p.name';

      const [rows] = await pool.execute(query, params);
      return { success: true, data: rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getFeaturedProducts() {
    try {
      const [rows] = await pool.execute(`
        SELECT p.*, c.name as category_name 
        FROM products p 
        LEFT JOIN categories c ON p.category_id = c.id 
        WHERE p.is_featured = 1 AND p.is_available = 1 
        ORDER BY p.name
      `);
      return { success: true, data: rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getProduct(productId: number) {
    try {
      const [rows] = await pool.execute(`
        SELECT p.*, c.name as category_name 
        FROM products p 
        LEFT JOIN categories c ON p.category_id = c.id 
        WHERE p.id = ?
      `, [productId]);
      
      const products = rows as any[];
      if (products.length === 0) {
        return { success: false, error: 'Product not found' };
      }

      // Get reviews for this product
      const [reviewRows] = await pool.execute(`
        SELECT r.*, pr.full_name 
        FROM reviews r 
        LEFT JOIN profiles pr ON r.user_id = pr.id 
        WHERE r.product_id = ? AND r.is_approved = 1 
        ORDER BY r.created_at DESC
      `, [productId]);

      const product = products[0];
      product.reviews = reviewRows;

      return { success: true, data: product };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Orders
  async createOrder(orderData: any) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Generate order number
      const orderNumber = `NB${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      
      const [result] = await connection.execute(`
        INSERT INTO orders (user_id, order_number, total_amount, delivery_method, delivery_address, delivery_date, delivery_time, special_instructions, status, payment_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'pending')
      `, [
        orderData.user_id,
        orderNumber,
        orderData.total_amount,
        orderData.delivery_method,
        orderData.delivery_address,
        orderData.delivery_date,
        orderData.delivery_time,
        orderData.special_instructions
      ]);

      const orderId = (result as any).insertId;

      await connection.commit();
      return { success: true, data: { id: orderId, order_number: orderNumber } };
    } catch (error) {
      await connection.rollback();
      return { success: false, error: error.message };
    } finally {
      connection.release();
    }
  },

  async addOrderItems(orderId: number, items: any[]) {
    try {
      const values = items.map(item => [
        orderId,
        item.product_id,
        item.quantity,
        item.unit_price,
        item.total_price,
        JSON.stringify(item.customizations || {})
      ]);

      await pool.execute(`
        INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price, customizations)
        VALUES ?
      `, [values]);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getUserOrders(userId: number) {
    try {
      const [rows] = await pool.execute(`
        SELECT o.*, 
               GROUP_CONCAT(
                 CONCAT(oi.quantity, 'x ', p.name) 
                 SEPARATOR ', '
               ) as items_summary
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE o.user_id = ?
        GROUP BY o.id
        ORDER BY o.created_at DESC
      `, [userId]);
      return { success: true, data: rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Custom Cake Requests
  async createCakeRequest(requestData: any) {
    try {
      const [result] = await pool.execute(`
        INSERT INTO custom_cake_requests 
        (user_id, occasion, size, flavor, design_description, special_requirements, budget_range, needed_by_date, contact_phone, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
      `, [
        requestData.user_id,
        requestData.occasion,
        requestData.size,
        requestData.flavor,
        requestData.design_description,
        requestData.special_requirements,
        requestData.budget_range,
        requestData.needed_by_date,
        requestData.contact_phone
      ]);

      return { success: true, data: { id: (result as any).insertId } };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getUserCakeRequests(userId: number) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM custom_cake_requests WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
      );
      return { success: true, data: rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Events
  async getEvents() {
    try {
      const [rows] = await pool.execute(`
        SELECT * FROM events 
        WHERE is_active = 1 AND date_time >= NOW() 
        ORDER BY date_time
      `);
      return { success: true, data: rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getEvent(eventId: number) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM events WHERE id = ?',
        [eventId]
      );
      const events = rows as any[];
      return { success: true, data: events[0] || null };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async createEventBooking(bookingData: any) {
    try {
      const [result] = await pool.execute(`
        INSERT INTO event_bookings 
        (event_id, user_id, participants_count, total_amount, special_requests, status)
        VALUES (?, ?, ?, ?, ?, 'confirmed')
      `, [
        bookingData.event_id,
        bookingData.user_id,
        bookingData.participants_count,
        bookingData.total_amount,
        bookingData.special_requests
      ]);

      return { success: true, data: { id: (result as any).insertId } };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getUserEventBookings(userId: number) {
    try {
      const [rows] = await pool.execute(`
        SELECT eb.*, e.title, e.date_time, e.event_type
        FROM event_bookings eb
        LEFT JOIN events e ON eb.event_id = e.id
        WHERE eb.user_id = ?
        ORDER BY eb.created_at DESC
      `, [userId]);
      return { success: true, data: rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Reviews
  async createReview(reviewData: any) {
    try {
      const [result] = await pool.execute(`
        INSERT INTO reviews (user_id, product_id, order_id, rating, comment, is_approved)
        VALUES (?, ?, ?, ?, ?, 0)
      `, [
        reviewData.user_id,
        reviewData.product_id,
        reviewData.order_id,
        reviewData.rating,
        reviewData.comment
      ]);

      return { success: true, data: { id: (result as any).insertId } };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// JWT helper functions
export const auth = {
  generateToken(payload: any) {
    return jwt.sign(payload, import.meta.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });
  },

  verifyToken(token: string) {
    try {
      return jwt.verify(token, import.meta.env.JWT_SECRET || 'your-secret-key');
    } catch (error) {
      return null;
    }
  }
};