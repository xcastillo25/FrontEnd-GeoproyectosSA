const { sequelize } = require('../models'); 
const { LicenciasAmbientales, Servicios, Clientes } = require('../models');  // Ajusta la ruta según tu estructura de proyecto
const { Op } = require('sequelize');
const Sequelize = require('sequelize');

const mostrarLicenciaAmbiental = async (req, res) => {
    try {
        const licencias = await LicenciasAmbientales.findAll({
            attributes: {
                include: [
                    [Sequelize.literal("ubicacion.STAsText()"), 'ubicacionTexto'] // Usamos STAsText() para convertir la geometría a texto
                ]
            },
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
        const licenciasTransformadas = licencias.map(licencia => {
            const plainLicenciaAmbiental = licencia.get({ plain: true });
            plainLicenciaAmbiental.ubicacion = plainLicenciaAmbiental.ubicacionTexto || "No definido"; // Usamos el valor de texto
            delete plainLicenciaAmbiental.ubicacionTexto; // Eliminamos la propiedad temporal si no se necesita
            return plainLicenciaAmbiental;
        });
        res.status(200).send({ licencias: licenciasTransformadas });
    } catch (error) {
        console.error('Error al obtener las licencias:', error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};

const mostrarLicenciaAmbientalActiva = async (req, res) => {
    try {
        const licenciasambientales = await LicenciasAmbientales.findAll({
            include: [
                {
                    model: Servicios,   // Asegúrate de que 'Servicios' esté correctamente importado
                    as: 'Servicio',     // Este 'as' debe coincidir con el alias definido en la asociación de 'LicenciasAmbientales' a 'Servicios'
                    attributes: ['servicio']  // Corregido de 'servio' a 'servicio'
                },
                {
                    model: Clientes,    // Asegúrate de que 'Clientes' esté correctamente importado
                    as: 'Cliente',      // Este 'as' debe coincidir con el alias definido en la asociación de 'LicenciasAmbientales' a 'Clientes'
                    attributes: ['nombre', 'apellidos']  // Asegúrate de que estos atributos existen en el modelo 'Clientes'
                }
            ],
            where: {
                activo: true
            }
        });
        res.status(200).send({ licenciasambientales: licenciasambientales });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};

const crearLicenciaAmbiental = async (req, res) => {
    try {
        const { idcliente, idservicio, costo, anticipo, fecha_resolucion, numero_resolucion,
                fecha_ingreso, numero_expediente, vigencia_licencias, fecha_renovacion,
                fecha_ingreso_ampliacion, observaciones, ubicacion, direccion_servicio,
                estado } = req.body;

        console.log("Inserting with WKT:", ubicacion);
 // Asegúrate de que ubicacion contenga las coordenadas en el formato correcto

        const nuevaLicenciaAmbiental = await LicenciasAmbientales.create({
            idcliente,
            idservicio,
            costo,
            anticipo,
            fecha_resolucion,
            numero_resolucion,
            fecha_ingreso,
            numero_expediente,
            vigencia_licencias,
            fecha_renovacion,
            fecha_ingreso_ampliacion,
            observaciones,
            ubicacion: sequelize.fn('geometry::STGeomFromText', sequelize.literal(`'${ubicacion}'`), 4326),
            direccion_servicio,
            estado
        });

        res.status(201).send({ message: 'Licencia creada con éxito', data: nuevaLicenciaAmbiental });
    } catch (error) {
        console.error('Error al crear la licencia ambiental:', error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};

const actualizarLicenciaAmbiental = async (req, res) => {
    const { idlicencia } = req.params;

    try {
        const licencia = await LicenciasAmbientales.findByPk(idlicencia);

        if (!licencia) {
            return res.status(404).send({ message: 'Servicio no encontrado.' });
        }

        const { idcliente, idservicio, costo, anticipo, fecha_resolucion, numero_resolucion,
            fecha_ingreso, numero_expediente, vigencia_licencias, fecha_renovacion,
            fecha_ingreso_ampliacion, observaciones, ubicacion, direccion_servicio,
            estado  } = req.body;

        
        // Preparar datos para la actualización
        const datosActualizados = {
            idcliente,
            idservicio,
            costo,
            anticipo,
            fecha_resolucion,
            numero_resolucion,
            fecha_ingreso,
            numero_expediente,
            vigencia_licencias,
            fecha_renovacion,
            fecha_ingreso_ampliacion,
            observaciones,
            ubicacion,
            direccion_servicio,
            estado
        };

        // Actualizar la ubicación si se proporciona nueva, utilizando el formato WKT correcto
        if (ubicacion) {
            datosActualizados.ubicacion = sequelize.fn('geometry::STGeomFromText', sequelize.literal(`'${ubicacion}'`), 4326);
        }

        // Ejecutar la actualización
        await licencia.update(datosActualizados);

        res.status(200).send({ message: 'Servicio actualizado con éxito', data: licencia });
    } catch (error) {
        console.error('Error al actualizar servicio:', error);
        res.status(500).send({ message: 'Error interno del servidor.', error: error.message });
    }
};

const cambiarEstadoLicenciaAmbiental = async (req, res) => {
    try {
        const { idlicencia} = req.params;
        const licenciaambiental = await LicenciasAmbientales.findOne({ where: {idlicencia: idlicencia}});

        licenciaambiental.activo = !licenciaambiental.activo;

        await licenciaambiental.save();

        res.send({ message: 'Estado del servicio actualizado con éxito.', licenciaambiental});
    } catch (error) {
        res.status(500).send({ message: error.message});
    }
};

const eliminarLicenciaAmbiental = async (req, res) => {
    const { idlicencia } = req.params;

    try{
        await LicenciasAmbientales.destroy({
            where: { idlicencia: idlicencia }
        });

        res.status(200).send({ message: 'Servicio eliminado definitivamente con éxito'});
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};

module.exports ={
    crearLicenciaAmbiental, mostrarLicenciaAmbiental, actualizarLicenciaAmbiental, eliminarLicenciaAmbiental,
    cambiarEstadoLicenciaAmbiental
}