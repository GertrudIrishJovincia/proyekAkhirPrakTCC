import Product from "../models/Product.js";
import Category from "../models/Category.js";
import User from "../models/UserModel.js"; // Fixed: change from Users.js to UserModel.js
import { Op } from "sequelize";

export const getProducts = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Product.findAll({
        attributes: ['uuid', 'name', 'price'],
        include: [
          {
            model: User,
            as: 'user', // Add alias to match associations
            attributes: ['name', 'email']
          },
          
          {
            model: Category,
            as: 'categoryInfo', // Use the alias from associations
            attributes: ['type', 'description']
          }
        ]
      });
    } else {
      response = await Product.findAll({
        attributes: ['uuid', 'name', 'price'],
        where: {
          userId: req.userId
        },
        include: [
          {
            model: User,
            as: 'user', // Add alias to match associations
            attributes: ['name', 'email']
          },
          {
            model: Category,
            as: 'categoryInfo', // Use the alias from associations
            attributes: ['type', 'description']
          }
        ]
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id
      }
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
    
    let response;
    if (req.role === "admin") {
      response = await Product.findOne({
        attributes: ['uuid', 'name', 'price'],
        where: {
          id: product.id
        },
        include: [
          {
            model: User,
            as: 'user', // Add alias to match associations
            attributes: ['name', 'email']
          },
          {
            model: Category,
            as: 'categoryInfo', // Use the alias from associations
            attributes: ['type', 'description']
          }
        ]
      });
    } else {
      response = await Product.findOne({
        attributes: ['uuid', 'name', 'price'],
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }]
        },
        include: [
          {
            model: User,
            as: 'user', // Add alias to match associations
            attributes: ['name', 'email']
          },
          {
            model: Category,
            as: 'categoryInfo', // Use the alias from associations
            attributes: ['type', 'description']
          }
        ]
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

export const createProduct = async (req, res) => {
  const { name, price, category_id } = req.body; // Change to category_id to match associations
  try {
    await Product.create({
      name: name,
      price: price,
      category_id: category_id, // Use category_id
      userId: req.userId
    });
    res.status(201).json({ msg: "Product Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id
      }
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
    
    const { name, price, category_id } = req.body; // Change to category_id
    if (req.role === "admin") {
      await Product.update({ name, price, category_id }, {
        where: {
          id: product.id
        }
      });
    } else {
      if (req.userId !== product.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await Product.update({ name, price, category_id }, {
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }]
        }
      });
    }
    res.status(200).json({ msg: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id
      }
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
    
    if (req.role === "admin") {
      await Product.destroy({
        where: {
          id: product.id
        }
      });
    } else {
      if (req.userId !== product.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await Product.destroy({
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }]
        }
      });
    }
    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}