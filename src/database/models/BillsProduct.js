module.exports = (sequelize, dataTypes) => {
  const alias = "BillsProduct"
  const cols ={
   id:{
    type: dataTypes.BIGINT(10).UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
   },
   id_bills:{
       type: dataTypes.BIGINT(10).UNSIGNED,
       allowNull: false
   },
   id_products:{
       type: dataTypes.BIGINT(10).UNSIGNED
   },
   cantidad:{
       type: dataTypes.INTEGER
   },
   price:{
       type: dataTypes.INTEGER
   },
   
  }
  
  const config = {
    tableName: 'bills_products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
   }

  const BillsProduct = sequelize.define(alias, cols, config)
  return BillsProduct
}