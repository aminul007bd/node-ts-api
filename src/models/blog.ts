import { DataTypes, Model } from "sequelize";

import User from "./user";
import sequelize from "../config/database";

class Blog extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public authorId!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "blog",
    timestamps: false,
  }
);

Blog.belongsTo(User, { foreignKey: "authorId" });

export default Blog;
