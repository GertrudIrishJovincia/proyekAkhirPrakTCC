import Product from './Product.js';
import Category from './Category.js';
import Transaction from './Transaction.js';
import User from './UserModel.js';

// Relasi Product → Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'categoryInfo', // Add alias to avoid naming collision
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Category.hasMany(Product, {
  foreignKey: 'category_id',
  as: 'products', // Add alias for clarity
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

// Relasi Product → Transaction
Product.hasMany(Transaction, {
  foreignKey: 'product_id',
  as: 'transactions', // Add alias for clarity
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Transaction.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'productInfo', // Add alias to avoid naming collision
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

// Relasi User → Product (if needed)
User.hasMany(Product, {
  foreignKey: 'userId',
  as: 'products',
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Product.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

// Relasi User → Transaction (if needed)
User.hasMany(Transaction, {
  foreignKey: 'userId',
  as: 'transactions',
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Transaction.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

export { Product, Category, Transaction, User };