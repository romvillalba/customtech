const db = require("../../database/models");
const bcrypt = require("bcryptjs");
const User = db.User;
const { Op } = require('sequelize')

module.exports = {

    list: async (req, res) => {
        let response = { data: {} };
        try {
            const usuarios = await User.findAll()

            response.data.count = usuarios.length
            response.data.users = usuarios.map((usuario) => {
                return {
                    id: usuario.id,
                    name: usuario.name,
                    email: usuario.email,
                    detail: `api/users/${usuario.id}`,
                    erased: usuario.erased,
                    image: usuario.image
                }
            })
            return res.json(response)

        } catch (e) {
            response.msg = "Hubo un error"
            return res.json(response)
        }
    },

    detail: async (req, res) => {
        let response = {};
        try {
            const findUser = await User.findByPk(req.params.id, { attributes: { exclude: ["created_at", "updated_at", "password", "profile"] } });

            response.meta = {
                status: 200,
                total: findUser.length,
                url: `api/users/${req.params.id}`
            };
            response.data = findUser;
            return res.json(response);

        } catch (error) {
            console.log("Hubo un error:", error);
            response.meta = {
                status: 500,
                total: null,
                url: `api/users/${req.params.id}`
            };
            response.msg = `Oops! algo salió mal al querer buscar al usuario con ID: ${req.params.id}`
            return res.status(500).json(response);
        }
    }
}