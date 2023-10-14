const db = require("../../database/models");
const Product = db.Product;
const Category = db.Category;

module.exports = {

    list: async (req,res) => {
        let response = {data:{}};
        try { //alias de la asociación en el modelo
            const [productos, categorys] = await Promise.all([Product.findAll(), Category.findAll({include: [{association: 'products'}]})]) //PONER NOMBRE DE ASOCIACIÓN
            response.data.count = productos.length
            response.data.countByCategory = {}

            categorys.forEach( (categoria) => {
                response.data.countByCategory[categoria.name] = categoria.products.length
            });

            
            response.data.products = productos.map((product)=> {
                return {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    category: product.id_category,
                    detail: `/api/products/${product.id}`,
                    erased: product.erased,
                    image: product.image
                }
            })
            return res.json(response)

        } catch (e) {
            response.msg = "Hubo un error"
            return res.json(response)
        }
    },

    detail: async (req,res) => {
        let response = {};
        try {
            const findProduct = await Product.findByPk(req.params.id,  {include: [{association:"categorys"}]}) //me quedé acá {exclude: [ "created_at", "updated_at"]}, ???????????????????????
            response.meta = {
                status: 200,
                url: `/api/products/${req.params.id}`
            }
            response.data = findProduct;
            response.data.image = `/public/images/${findProduct.image}`

            return res.json(response);

        } catch (error) {
            console.log ("Hubo un error al buscar el producto:", error);
            response.meta = {
                status: 500,
                url: `/api/products/${req.params.id}`
            };
            response.msg = `Oops! algo salió mal al querer buscar al producto con ID: ${req.params.id}`
            return res.status(500).json(response);
        }
    }
}