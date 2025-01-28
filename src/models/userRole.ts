import { DataTypes, Model } from "sequelize";

import sequelize from "../config/database";

class UserRole extends Model {
  public id!: number;
  public roleName!: string;
  public description?: string;
}

UserRole.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roleName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    tableName: "userRole",
    timestamps: false,
  }
);

export default UserRole;
