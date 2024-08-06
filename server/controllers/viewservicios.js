const { viewservicios } = require('../models'); // Asegúrate de ajustar la ruta según la estructura de tu proyecto

const getAllServicios = async (req, res) => {
    try {
        const servicios = await viewservicios.findAll();
        res.status(200).send({ Servicios: servicios});
    } catch (error) {
        console.error('Error al obtener los servicios:', error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};

module.exports = {
    getAllServicios,
};
