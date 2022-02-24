import { DataTypes, Model } from "sequelize"
import { db } from "../app/database"

export default class Site extends Model {}

Site.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "compositeIndex",
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "site" }
)
