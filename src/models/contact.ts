import { DataTypes, Model } from "sequelize";

import sequelize from "../config/database";

class Contact extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public message!: string;
  public createdAt!: Date;
}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "contact",
    timestamps: false,
  }
);

export default Contact;
