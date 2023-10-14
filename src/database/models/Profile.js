module.exports = (sequelize, dataTypes) => {
  const alias = "Profile"
  const cols ={
   id:{
    type: dataTypes.BIGINT(10).UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
   },
   name:{
       type: dataTypes.STRING,
       allowNull: false
   },
  }

  const config = {
    tableName: 'profile',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
   }

  const Profile = sequelize.define(alias, cols, config)
  Profile.associate= (models)=>{
    Profile.hasMany(models.User,
    {
        as:"userprofile",
        foreignKey:"id_profile",
    })}
  return Profile
}