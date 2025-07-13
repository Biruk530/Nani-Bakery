# Nani Bakery Website

A comprehensive e-commerce website for Nani Bakery featuring product catalog, custom cake design, event booking, and admin management system.

## 🚀 Features

### Customer Features
- **Product Catalog**: Browse and purchase bakery items by category
- **Custom Cake Design**: Request custom cakes with detailed specifications
- **Event Booking**: Book baking classes and workshops
- **User Authentication**: Secure account creation and management
- **Order Management**: Track orders and view order history
- **Reviews & Ratings**: Leave feedback on products and services
- **Responsive Design**: Optimized for all devices

### Admin Features
- **Order Management**: View and update order statuses
- **Product Management**: Add, edit, and manage product inventory
- **Custom Cake Requests**: Review and quote custom cake requests
- **Event Management**: Create and manage workshops and events
- **User Management**: View customer profiles and order history
- **Analytics Dashboard**: Track sales and performance metrics

## 🛠 Technology Stack

### Frontend
- **Astro**: Static site generator with server-side rendering
- **React**: Interactive components and UI elements
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons

### Backend & Database
- **MySQL**: Relational database with XAMPP
- **Node.js**: Server-side JavaScript runtime
- **JWT Authentication**: Secure token-based authentication
- **bcryptjs**: Password hashing and verification

### Authentication
- **JWT Tokens**: Secure token-based authentication
- **Protected routes**: Secure admin and user areas
- **Role-based access control**: Admin and customer permissions

## 📊 Database Schema

### Core Tables

#### `profiles`
- User profile information extending Supabase auth
- Fields: id, email, full_name, phone, address, city, postal_code, is_admin

#### `categories`
- Product categories (cakes, pastries, breads, etc.)
- Fields: id, name, description, image_url, is_active, sort_order

#### `products`
- Bakery products with pricing and details
- Fields: id, category_id, name, description, price, image_url, images, ingredients, allergens, is_available, is_featured, preparation_time_hours

#### `orders`
- Customer orders with delivery information
- Fields: id, user_id, order_number, status, total_amount, delivery_method, delivery_address, delivery_date, payment_status

#### `order_items`
- Individual items within orders
- Fields: id, order_id, product_id, quantity, unit_price, total_price, customizations

#### `custom_cake_requests`
- Custom cake design requests
- Fields: id, user_id, occasion, size, flavor, design_description, budget_range, needed_by_date, status, quoted_price

#### `events`
- Bookable events and workshops
- Fields: id, title, description, event_type, date_time, duration_minutes, max_participants, price_per_person

#### `event_bookings`
- User event reservations
- Fields: id, event_id, user_id, participants_count, total_amount, special_requests, status

#### `reviews`
- Product and service reviews
- Fields: id, user_id, product_id, order_id, rating, comment, is_approved

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn
- XAMPP (Apache + MySQL)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nani-bakery-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up XAMPP and MySQL**
   - Install and start XAMPP
   - Start Apache and MySQL services
   - Open phpMyAdmin (http://localhost/phpmyadmin)
   - Import the database schema:
     ```sql
     -- Copy and paste the contents of database/schema.sql
     ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=nani_bakery
   DB_PORT=3306
   JWT_SECRET=your_jwt_secret_key_here
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:4321
   - Admin panel: http://localhost:4321/admin (requires admin account)

### Creating an Admin User

1. The database schema includes a default admin user:
   - Email: admin@nanibakery.com
   - Password: admin123
2. Or create a new admin user by registering normally, then updating the `is_admin` field in the database

## 🔌 API Endpoints

### Authentication
- `POST /auth/signup` - Create new user account
- `POST /auth/signin` - User login
- `POST /auth/signout` - User logout
- `GET /auth/user` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured` - Get featured products
- `GET /api/categories` - Get all categories

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `PUT /api/orders/:id` - Update order status (admin)

### Custom Cakes
- `POST /api/custom-cakes` - Submit custom cake request
- `GET /api/custom-cakes` - Get user's cake requests
- `PUT /api/custom-cakes/:id` - Update request status (admin)

### Events
- `GET /api/events` - Get upcoming events
- `POST /api/events/book` - Book event
- `GET /api/events/bookings` - Get user bookings

## 💻 Code Examples

### Database Query Example
```typescript
// Get products with category information
const result = await db.getProducts();
if (result.success) {
  const products = result.data;
}
```

### Authentication Example
```typescript
// Register new user
const result = await db.createUser('user@example.com', 'password123', 'John Doe');
if (result.success) {
  console.log('User created with ID:', result.userId);
}
```

### Order Creation Example
```typescript
// Create new order
const orderData = {
  user_id: user.id,
  total_amount: 45.00,
  delivery_method: 'pickup',
  delivery_date: '2024-01-15',
  status: 'pending'
};

const result = await db.createOrder(orderData);
if (result.success) {
  console.log('Order created:', result.data);
}
```

## 🎨 UI Components

### Button Component
```tsx
<Button 
  variant="primary" 
  size="lg" 
  onClick={handleClick}
  isLoading={loading}
>
  Add to Cart
</Button>
```

### Product Card Component
```tsx
<ProductCard 
  product={product}
  onAddToCart={handleAddToCart}
  onViewDetails={handleViewDetails}
/>
```

### Modal Component
```tsx
<Modal 
  isOpen={isOpen}
  onClose={handleClose}
  title="Product Details"
  size="lg"
>
  <ProductDetails product={selectedProduct} />
</Modal>
```

## 🔒 Security Features

### Database Security
- Password hashing with bcryptjs
- JWT token-based authentication
- Input validation and sanitization
- Prepared statements to prevent SQL injection

### Authentication Security
- Email/password authentication
- Secure session management
- Protected routes for admin areas
- Input validation and sanitization

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Deploy to Vercel
1. Connect your repository to Vercel
2. Set framework preset to "Astro"
3. Add environment variables in Vercel dashboard

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Product browsing and filtering
- [ ] Add to cart functionality
- [ ] Order placement process
- [ ] Custom cake request submission
- [ ] Event booking
- [ ] Admin order management
- [ ] Responsive design on all devices

### Test User Accounts
Create test accounts for different user types:
- Regular customer
- Admin user
- Test various user flows

## 🐛 Troubleshooting

### Common Issues

1. **MySQL Connection Error**
   - Ensure XAMPP is running
   - Verify MySQL service is started
   - Check database credentials in .env file
   - Ensure database 'nani_bakery' exists

2. **Build Errors**
   - Clear node_modules and reinstall dependencies
   - Check TypeScript errors
   - Verify all imports are correct

3. **Authentication Issues**
   - Verify JWT_SECRET is set in .env
   - Check if user exists in database
   - Ensure password is correctly hashed

## 📈 Performance Optimization

### Image Optimization
- Use WebP format when possible
- Implement lazy loading for product images
- Optimize image sizes for different screen sizes

### Code Splitting
- Astro automatically splits code by page
- Use dynamic imports for heavy components
- Implement service worker for caching

### Database Optimization
- Proper indexing on frequently queried columns
- Use database functions for complex queries
- Implement pagination for large datasets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request


## 📞 Support

For support and questions:
- Email: biruksolomonti@gmail.com
- Phone: +251 912 959 601
- Address: Addis Ababa Tulu Dimtu, Nearby Alem Bank

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- Full e-commerce functionality
- Custom cake design system
- Event booking system
- Admin dashboard
- Responsive design
- Supabase integration

---

**Built with ❤️ by the Nani Bakery team**
