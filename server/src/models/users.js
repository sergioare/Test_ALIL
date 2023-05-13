import { DataTypes } from "sequelize";
import {sequelize} from "../db/db.js";

export const User =
  // define the model
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID, // don´t repeat in API
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      email: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      hashedPassword:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        }
    }

  );
