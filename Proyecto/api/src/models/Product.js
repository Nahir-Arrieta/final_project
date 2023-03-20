const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define(
    'Product',
    {
      id: {
        type: DataTypes.INTEGER,
        // defaultValue: DataTypes.UUIDV4,
        autoIncrement: true,
        primaryKey: true,

      },
      name: {
        type: DataTypes.STRING

      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      sellingPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      average_rating: {
        type: DataTypes.FLOAT
      },
      availability: {
        type: DataTypes.STRING
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      availability: {
        type: DataTypes.STRING,
      },
      breadcrumbs: {
        type: DataTypes.STRING,
      },
      category: {
        type: DataTypes.STRING,
        // allowNull: false,
      },

      reviews_count: {
        type: DataTypes.FLOAT,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        // allowNull: false,
      },

      reviews_count: {
        type: DataTypes.FLOAT
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  )
}
