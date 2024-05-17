const { sequelize } = require('../models'); 
const { OtrosServicios, Servicios, Clientes } = require('../models');  // Ajusta la ruta según tu estructura de proyecto
const { Op } = require('sequelize');
const Sequelize = require('sequelize');

const mostrarOtroServicio = async (req, res) => {
    try {
        const otros_servicios = await OtrosServicios.findAll({
            include: [
                {
                    model: Servicios,
                    as: 'Servicio',
                    attributes: ['servicio']
                },
                {
                    model: Clientes,
                    as: 'Cliente',
                    attributes: ['nombre', 'apellidos']
                }
            ]
        });
        res.status(200).send({ otros_servicios: otros_servicios });
    } catch (error) {
        console.error('Error al obtener los servicios:', error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};

const mostrarOtroServicioActiva = async (req, res) => {
    try {
        const otros_servicios = await OtrosServicios.findAll({
            include: [
                {
                    model: Servicios,   // Asegúrate de que 'Servicios' esté correctamente importado
                    as: 'Servicio',     // Este 'as' debe coincidir con el alias definido en la asociación de 'OtrosServicios' a 'Servicios'
                    attributes: ['servicio']  // Corregido de 'servio' a 'servicio'
                },
                {
                    model: Clientes,    // Asegúrate de que 'Clientes' esté correctamente importado
                    as: 'Cliente',      // Este 'as' debe coincidir con el alias definido en la asociación de 'OtrosServicios' a 'Clientes'
                    attributes: ['nombre', 'apellidos']  // Asegúrate de que estos atributos existen en el modelo 'Clientes'
                }
            ],
            where: {
                activo: true
            }
        });
        res.status(200).send({ otros_servicios: otros_servicios });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};

const crearOtroServicio = async (req, res) => {
    try {
        const { idcliente, idservicio, costo, anticipo, fecha_entrega, observaciones,
                estado } = req.body;

        const nuevaOtroServicio = await OtrosServicios.create({
            idcliente,
            idservicio,
            costo,
            anticipo,
            fecha_entrega,
            observaciones,
            estado
        });

        res.status(201).send({ message: 'Servicio creado con éxito', data: nuevaOtroServicio });
    } catch (error) {
        console.error('Error al crear el servicio:', error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};

const actualizarOtroServicio = async (req, res) => {
    const { idotro_servicio } = req.params;

    try {
        const otro_servicio = await OtrosServicios.findByPk(idotro_servicio);

        if (!otro_servicio) {
            return res.status(404).send({ message: 'Servicio no encontrado.' });
        }

        const { idcliente, idservicio, costo, anticipo, fecha_entrega, observaciones,
            estado  } = req.body;

        const datosActualizados = {
            idcliente,
            idservicio,
            costo,
            anticipo,
            fecha_entrega,
            observaciones,
            estado
        };

        await otro_servicio.update(datosActualizados);

        res.status(200).send({ message: 'Servicio actualizado con éxito', data: otro_servicio });
    } catch (error) {
        console.error('Error al actualizar servicio:', error);
        res.status(500).send({ message: 'Error interno del servidor.', error: error.message });
    }
};

const cambiarEstadoOtroServicio = async (req, res) => {
    try {
        const { idotro_servicio} = req.params;
        const otro_servicio = await OtrosServicios.findOne({ where: {idotro_servicio: idotro_servicio}});

        otro_servicio.activo = !otro_servicio.activo;

        await otro_servicio.save();

        res.send({ message: 'Estado del servicio actualizado con éxito.', otro_servicio});
    } catch (error) {
        res.status(500).send({ message: error.message});
    }
};

const eliminarOtroServicio = async (req, res) => {
    const { idotro_servicio } = req.params;

    try{
        await OtrosServicios.destroy({
            where: { idotro_servicio: idotro_servicio }
        });

        res.status(200).send({ message: 'Servicio eliminado definitivamente con éxito'});
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};

module.exports ={
    crearOtroServicio, mostrarOtroServicio, actualizarOtroServicio, eliminarOtroServicio,
    cambiarEstadoOtroServicio
}