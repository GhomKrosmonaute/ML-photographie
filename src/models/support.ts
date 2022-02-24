import { DataTypes, Model } from "sequelize"
import { db } from "../app/database"

export default class Support extends Model {}

Support.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "compositeIndex",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { modelName: "support", sequelize: db }
)
