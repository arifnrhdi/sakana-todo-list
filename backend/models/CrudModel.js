import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Auth from "./AuthModel.js";

const { DataTypes } = Sequelize;

const Crud = db.define(
  "todo",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    // Foreign Key
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Auth.hasMany(Crud);
Crud.belongsTo(Auth, { foreignKey: "userId" });

export default Crud;
