module.exports = (sequelize, dataTypes) => {
  const alias = "Category"
  const cols = {
    id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: dataTypes.DATE
    },
    updated_at: {
      type: dataTypes.DATE
    }
  }

  const config = {
    tableName: 'category',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
  }

  const Category = sequelize.define(alias, cols, config)
  Category.associate = (models) => {
    Category.hasMany(models.Product,
      {
        as: "products",
        foreignKey: "id_category",
      })
  }

  return Category
}