const { sequelize } = require('../models'); 
const { Historial_Servicios, Empleados } = require('../models');  // Ajusta la ruta según tu estructura de proyecto
const { Op } = require('sequelize');
const Sequelize = require('sequelize');

const mostrarHistorialServicios = async (req, res) => {
    try {
        const historiales = await Historial_Servicios.findAll({
            include: [
                {
                    model: Empleados,
                    as: 'Empleado',
                    attributes: ['nombre', 'apellidos']  // Asegúrate de que estos atributos existen en el modelo 'Empleados'
                }
            ]
        });
        res.status(200).send({ historiales });
    } catch (error) {
        console.error('Error al obtener el historial de servicios:', error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};

const mostrarHistorialServiciosActivos = async (req, res) => {
    try {
        const historialesActivos = await Historial_Servicios.findAll({
            include: [
                {
                    model: Empleados,
                    as: 'Empleado',
                    attributes: ['nombre', 'apellidos']
                }
            ],
            where: {
                activo: true
            }
        });
        res.status(200).send({ historiales: historialesActivos });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};

const crearHistorialServicio = async (req, res) => {
    try {
        const { idservicio, tipo_servicio, fecha_proceso, descripcion, id_empleado, observaciones, estado } = req.body;

        const nuevoHistorial = await Historial_Servicios.create({
            idservicio,
            tipo_servicio,
            fecha_proceso,
            descripcion,
            id_empleado,
            observaciones,
            estado
        });

        res.status(201).send({ message: 'Historial creado con éxito', data: nuevoHistorial });
    } catch (error) {
        console.error('Error al crear el historial de servicio:', error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};

const actualizarHistorialServicio = async (req, res) => {
    const { idhistorial } = req.params;

    try {
        const historial = await Historial_Servicios.findByPk(idhistorial);

        if (!historial) {
            return res.status(404).send({ message: 'Historial no encontrado.' });
        }

        const { idservicio, tipo_servicio, fecha_proceso, descripcion, id_empleado, observaciones, estado, activo } = req.body;

        const datosActualizados = {
            idservicio,
            tipo_servicio,
            fecha_proceso,
            descripcion,
            id_empleado,
            observaciones,
            estado,
            activo
        };

        await historial.update(datosActualizados);

        res.status(200).send({ message: 'Historial actualizado con éxito', data: historial });
    } catch (error) {
        console.error('Error al actualizar el historial de servicio:', error);
        res.status(500).send({ message: 'Error interno del servidor.', error: error.message });
    }
};

const cambiarEstadoHistorialServicio = async (req, res) => {
    try {
        const { idhistorial } = req.params;
        const historial = await Historial_Servicios.findOne({ where: { idhistorial } });

        if (!historial) {
            return res.status(404).send({ message: 'Historial no encontrado.' });
        }

        historial.activo = !historial.activo;
        await historial.save();

        res.send({ message: 'Estado del historial actualizado con éxito.', historial });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const eliminarHistorialServicio = async (req, res) => {
    const { idhistorial } = req.params;

    try {
        await Historial_Servicios.destroy({
            where: { idhistorial }
        });

        res.status(200).send({ message: 'Historial eliminado definitivamente con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};

module.exports = {
    crearHistorialServicio,
    mostrarHistorialServicios,
    actualizarHistorialServicio,
    eliminarHistorialServicio,
    cambiarEstadoHistorialServicio,
    mostrarHistorialServiciosActivos
};
