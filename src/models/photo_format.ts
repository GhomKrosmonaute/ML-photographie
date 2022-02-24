import { DataTypes, Model } from "sequelize"
import { db } from "../app/database"
import Format from "./format"

export default class Category extends Model {}

Category.init(
  {
    photo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Photo,
        key: "id",
      },
      onDelete: "cascade",
    },
    format_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Format,
        key: "id",
      },
      onDelete: "cascade",
    },
  },
  { sequelize: db, modelName: "photo_format" }
)
