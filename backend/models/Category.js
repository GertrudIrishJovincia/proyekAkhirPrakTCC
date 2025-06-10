import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Category = db.define("categories", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {  
    type: DataTypes.STRING,
    allowNull: false,   
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export default Category;
