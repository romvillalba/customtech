module.exports = (sequelize, dataTypes) => {
  const alias = "Bill"
  const cols ={
   id:{
    type: dataTypes.BIGINT(10).UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
   },
   total:{
       type: dataTypes.INTEGER,
       allowNull: false
   },
   fecha:{
       type: dataTypes.DATE
   },
  created_at: {
    type: dataTypes.DATE
    },
  updated_at: {
      type: dataTypes.DATE
  },
  id_user: dataTypes.BIGINT(10).UNSIGNED

  }

  const config = {
    tableName: 'bills',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
   }



  const Bill = sequelize.define(alias, cols, config)
  Bill.associate = (models)=>{
    
    Bill.belongsToMany(models.Product,{
        through:'BillsProduct',
        foreignKey:'id_bills',
        otherKey:'id_products'
    })

    Bill.belongsTo(models.User, {
      as: 'users',
      foreignKey: 'id_user'
    })
  }


  return Bill

  
}