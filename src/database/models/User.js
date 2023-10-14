module.exports = (sequelize, dataTypes) => {
  const alias = "User"
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
    email: {
      type: dataTypes.STRING,
      allowNull: false
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false
    },
    erased: {
      type: dataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    image: {
      type: dataTypes.STRING,
    },
    created_at: {
      type: dataTypes.DATE
    },
    updated_at: {
      type: dataTypes.DATE
    },
    id_profile: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      allowNull: false,
      defaultValue: 1
    }
  }

  const config = {
    tableName: 'user',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
  }
  const User = sequelize.define(alias, cols, config)

  User.associate = (models) => {
    User.belongsTo(models.Profile, {
      as: 'profiles',
      foreignKey: 'id_profile',

    })

    User.hasMany(models.Bill, {
      as: 'bills',
      foreignKey: 'id_user'
    })
  }

  return User
}