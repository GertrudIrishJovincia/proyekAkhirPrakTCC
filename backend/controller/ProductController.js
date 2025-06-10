import Product from "../models/Product.js";
import Category from "../models/Category.js";
import User from "../models/Users.js";
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
  const { name, price, categoryId } = req.body; // Use categoryId instead of category
  try {
    await Product.create({
      name: name,
      price: price,
      categoryId: categoryId, // Use categoryId
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
    
    const { name, price, categoryId } = req.body; // Use categoryId instead of category
    if (req.role === "admin") {
      await Product.update({ name, price, categoryId }, {
        where: {
          id: product.id
        }
      });
    } else {
      if (req.userId !== product.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await Product.update({ name, price, categoryId }, {
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