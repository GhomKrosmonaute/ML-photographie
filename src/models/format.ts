import { DataTypes, Model } from "sequelize"
import { db } from "../app/database"

export default class Format extends Model {}

Format.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "compositeIndex",
    },
  },
  { modelName: "format", sequelize: db }
)
