@@ .. @@
 -- Sample Categories
 INSERT INTO categories (name, description, image_url, sort_order) VALUES
-('Wedding Cakes', 'Beautiful custom wedding cakes for your special day', 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg', 1),
-('Birthday Cakes', 'Fun and delicious birthday cakes for all ages', 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg', 2),
-('Pastries', 'Fresh daily pastries including croissants and danishes', 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg', 3),
-('Breads', 'Artisan breads baked fresh every morning', 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg', 4),
-('Cookies', 'Homemade cookies in various flavors', 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg', 5);
+('Wedding Cakes', 'Beautiful custom wedding cakes for your special day', 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg', 1),
+('Birthday Cakes', 'Fun and delicious birthday cakes for all ages', 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg', 2),
+('Pastries', 'Fresh daily pastries including croissants and danishes', 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg', 3),
+('Breads', 'Artisan breads baked fresh every morning', 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg', 4),
+('Cookies', 'Homemade cookies in various flavors', 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg', 5);
 
 -- Sample Products with Ethiopian Birr pricing
 INSERT INTO products (category_id, name, description, price, image_url, ingredients, allergens, is_featured) VALUES
-(1, 'Classic Wedding Cake', 'Elegant three-tier wedding cake with vanilla sponge and buttercream', 2500.00, 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg', '["flour", "sugar", "eggs", "butter", "vanilla"]', '["gluten", "eggs", "dairy"]', TRUE),
-(1, 'Chocolate Wedding Cake', 'Rich chocolate wedding cake with ganache filling', 2800.00, 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg', '["flour", "cocoa", "sugar", "eggs", "butter"]', '["gluten", "eggs", "dairy"]', TRUE),
-(2, 'Rainbow Birthday Cake', 'Colorful layered birthday cake perfect for celebrations', 800.00, 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg', '["flour", "sugar", "eggs", "food coloring"]', '["gluten", "eggs"]', TRUE),
-(2, 'Chocolate Birthday Cake', 'Rich chocolate cake with chocolate frosting', 750.00, 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg', '["flour", "cocoa", "sugar", "eggs", "butter"]', '["gluten", "eggs", "dairy"]', FALSE),
-(3, 'Croissants (6 pack)', 'Buttery, flaky croissants baked fresh daily', 180.00, 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg', '["flour", "butter", "yeast", "salt"]', '["gluten", "dairy"]', TRUE),
-(3, 'Danish Pastries (4 pack)', 'Sweet Danish pastries with fruit filling', 220.00, 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg', '["flour", "butter", "sugar", "fruit"]', '["gluten", "dairy"]', FALSE),
-(4, 'Sourdough Bread', 'Traditional sourdough bread with crispy crust', 120.00, 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg', '["flour", "water", "salt", "sourdough starter"]', '["gluten"]', FALSE),
-(4, 'Whole Wheat Bread', 'Healthy whole wheat bread perfect for sandwiches', 100.00, 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg', '["whole wheat flour", "water", "yeast", "salt"]', '["gluten"]', FALSE),
-(5, 'Chocolate Chip Cookies (12 pack)', 'Classic chocolate chip cookies made with premium chocolate', 150.00, 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg', '["flour", "butter", "sugar", "chocolate chips"]', '["gluten", "dairy"]', TRUE),
-(5, 'Oatmeal Cookies (12 pack)', 'Hearty oatmeal cookies with raisins', 140.00, 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg', '["oats", "flour", "butter", "raisins"]', '["gluten", "dairy"]', FALSE);
+(1, 'Classic Wedding Cake', 'Elegant three-tier wedding cake with vanilla sponge and buttercream', 12500.00, 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg', '["flour", "sugar", "eggs", "butter", "vanilla"]', '["gluten", "eggs", "dairy"]', TRUE),
+(1, 'Chocolate Wedding Cake', 'Rich chocolate wedding cake with ganache filling', 14000.00, 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg', '["flour", "cocoa", "sugar", "eggs", "butter"]', '["gluten", "eggs", "dairy"]', TRUE),
+(2, 'Rainbow Birthday Cake', 'Colorful layered birthday cake perfect for celebrations', 4000.00, 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg', '["flour", "sugar", "eggs", "food coloring"]', '["gluten", "eggs"]', TRUE),
+(2, 'Chocolate Birthday Cake', 'Rich chocolate cake with chocolate frosting', 3750.00, 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg', '["flour", "cocoa", "sugar", "eggs", "butter"]', '["gluten", "eggs", "dairy"]', FALSE),
+(3, 'Croissants (6 pack)', 'Buttery, flaky croissants baked fresh daily', 900.00, 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg', '["flour", "butter", "yeast", "salt"]', '["gluten", "dairy"]', TRUE),
+(3, 'Danish Pastries (4 pack)', 'Sweet Danish pastries with fruit filling', 1100.00, 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg', '["flour", "butter", "sugar", "fruit"]', '["gluten", "dairy"]', FALSE),
+(4, 'Sourdough Bread', 'Traditional sourdough bread with crispy crust', 600.00, 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg', '["flour", "water", "salt", "sourdough starter"]', '["gluten"]', FALSE),
+(4, 'Whole Wheat Bread', 'Healthy whole wheat bread perfect for sandwiches', 500.00, 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg', '["whole wheat flour", "water", "yeast", "salt"]', '["gluten"]', FALSE),
+(5, 'Chocolate Chip Cookies (12 pack)', 'Classic chocolate chip cookies made with premium chocolate', 750.00, 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg', '["flour", "butter", "sugar", "chocolate chips"]', '["gluten", "dairy"]', TRUE),
+(5, 'Oatmeal Cookies (12 pack)', 'Hearty oatmeal cookies with raisins', 700.00, 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg', '["oats", "flour", "butter", "raisins"]', '["gluten", "dairy"]', FALSE);
 
 -- Sample Events with Ethiopian Birr pricing
 INSERT INTO events (title, description, event_type, date_time, duration_minutes, max_participants, price_per_person, image_url, requirements) VALUES
-('Cake Decorating Workshop', 'Learn professional cake decorating techniques', 'workshop', '2024-02-15 14:00:00', 180, 12, 350.00, 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg', '["apron", "notebook"]'),
-('Bread Making Class', 'Master the art of artisan bread making', 'class', '2024-02-20 10:00:00', 240, 8, 280.00, 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg', '["apron"]'),
-('Pastry Tasting Event', 'Sample our finest pastries with wine pairing', 'tasting', '2024-02-25 18:00:00', 120, 20, 180.00, 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg', '["ID for wine"]'),
-('Kids Birthday Party Package', 'Complete birthday party with cake decorating', 'party', '2024-03-01 15:00:00', 120, 15, 120.00, 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg', '["parent supervision"]');
+('Cake Decorating Workshop', 'Learn professional cake decorating techniques', 'workshop', '2024-02-15 14:00:00', 180, 12, 1750.00, 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg', '["apron", "notebook"]'),
+('Bread Making Class', 'Master the art of artisan bread making', 'class', '2024-02-20 10:00:00', 240, 8, 1400.00, 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg', '["apron"]'),
+('Pastry Tasting Event', 'Sample our finest pastries with wine pairing', 'tasting', '2024-02-25 18:00:00', 120, 20, 900.00, 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg', '["ID for wine"]'),
+('Kids Birthday Party Package', 'Complete birthday party with cake decorating', 'party', '2024-03-01 15:00:00', 120, 15, 600.00, 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg', '["parent supervision"]');