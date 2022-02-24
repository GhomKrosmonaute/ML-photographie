import { DataTypes, Model } from "sequelize"
import { db } from "../app/database"

export default class Category extends Model {}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Category,
        key: "id",
      },
      onDelete: "cascade",
    },
  },
  { sequelize: db, modelName: "category" }
)
