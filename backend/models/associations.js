import Product from './Product.js';
import Category from './Category.js';
import Transaction from './Transaction.js';
import User from './UserModel.js';

// Relasi Product → Category
Product.belongsTo(Category, { foreignKey: 'category_id', onDelete: "CASCADE", onUpdate: "CASCADE" });
Category.hasMany(Product, { foreignKey: 'category_id', onDelete: "CASCADE", onUpdate: "CASCADE" });

// Relasi Product → Transaction
Product.hasMany(Transaction, { foreignKey: 'product_id', onDelete: "CASCADE", onUpdate: "CASCADE" });
Transaction.belongsTo(Product, { foreignKey: 'product_id', onDelete: "CASCADE", onUpdate: "CASCADE" });

export { Product, Category, Transaction };
