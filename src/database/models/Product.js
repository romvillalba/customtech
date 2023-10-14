module.exports = (sequelize, dataTypes) => {
    const alias = "Product"
    const cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
            // allowNull: false
        },
        description: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.INTEGER
        },
        stock: {
            type: dataTypes.BIGINT(10).UNSIGNED
        },
        erased: {
            type: dataTypes.BOOLEAN
        },
        id_category: {
            type: dataTypes.BIGINT(10).UNSIGNED
        },
        created_at: {
            type: dataTypes.DATE
        },
        updated_at: {
            type: dataTypes.DATE
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false
        },
        recommended: {
            type: dataTypes.BOOLEAN
        },
        discount: {
            type: dataTypes.INTEGER,
        }
    }

    const config = {
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Product = sequelize.define(alias, cols, config)

    Product.associate = (models) => {
        Product.hasMany(models.ProductImage,
            {
                as: "product_image",
                foreignKey: "id_products",
            })

        Product.belongsTo(models.Category, {
            as: "categorys",
            foreignKey: 'id_category'
        })

        Product.belongsToMany(models.Bill, {

            through: 'BillsProduct',
            foreignKey: 'id_products',
            otherKey: 'id_bills'
        })
    }


    return Product


}

