module.exports = (sequelize, dataTypes) => {
  const alias = "ProductImage"
  const cols ={
   id:{
    type: dataTypes.BIGINT(10).UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
   },
   image:{
       type: dataTypes.STRING,
       allowNull: false
   },
   id_products:{
       type: dataTypes.BIGINT(10).UNSIGNED
   },
   erased:{
       type: dataTypes.BOOLEAN
   },
  }
  const config = {
    tableName: 'product_image',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
   }

  const ProductImage = sequelize.define(alias, cols, config)

  ProductImage.associate= (models)=>{

    ProductImage.belongsTo(models.Product, {
        as: "productsimages",
        foreignKey:'id_products'
   })}

  return ProductImage


}