import { DataTypes, Model } from "sequelize";

import sequelize from "../config/database";

class JobPost extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public location?: string;
  public salaryRange?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

JobPost.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(100),
    },
    salaryRange: {
      type: DataTypes.STRING(50),
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
    tableName: "jobPost",
    timestamps: false,
  }
);

export default JobPost;
