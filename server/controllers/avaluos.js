const { sequelize } = require('../models'); 
const { Avaluos, Servicios, Clientes } = require('../models');  // Ajusta la ruta según tu estructura de proyecto
const { Op } = require('sequelize');
const Sequelize = require('sequelize');

const mostrarAvaluos = async (req, res) => {
    try {
        const avaluos = await Avaluos.findAll({
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
        const avaluosTransformados = avaluos.map(avaluo => {
            const plainAvaluo = avaluo.get({ plain: true });
            plainAvaluo.ubicacion = plainAvaluo.ubicacionTexto || "No definido"; // Usamos el valor de texto
            delete plainAvaluo.ubicacionTexto; // Eliminamos la propiedad temporal si no se necesita
            return plainAvaluo;
        });
        res.status(200).send({ avaluos: avaluosTransformados });
    } catch (error) {
        console.error('Error al obtener avaluos:', error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};


const mostrarAvaluoActivo = async (req, res) => {
    try {
        const avaluos = await Avaluos.findAll({
            include: [
                {
                    model: Servicios,   // Asegúrate de que 'Servicios' esté correctamente importado
                    as: 'Servicio',     // Este 'as' debe coincidir con el alias definido en la asociación de 'Avaluos' a 'Servicios'
                    attributes: ['servicio']  // Corregido de 'servio' a 'servicio'
                },
                {
                    model: Clientes,    // Asegúrate de que 'Clientes' esté correctamente importado
                    as: 'Cliente',      // Este 'as' debe coincidir con el alias definido en la asociación de 'Avaluos' a 'Clientes'
                    attributes: ['nombre', 'apellidos']  // Asegúrate de que estos atributos existen en el modelo 'Clientes'
                }
            ],
            where: {
                activo: true
            }
        });
        res.status(200).send({ avaluos: avaluos });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};

const crearAvaluo = async (req, res) => {
    try {
        const { idcliente, idservicio, costo, anticipo, licenciado,
                telefono_licenciado, fecha_ingreso, numero_expediente,
                fecha_ingreso_ampliacion, observaciones,
                ubicacion, direccion_servicio, estado } = req.body;

        console.log("Inserting with WKT:", ubicacion);
 // Asegúrate de que ubicacion contenga las coordenadas en el formato correcto

        const nuevoAvaluo = await Avaluos.create({
            idcliente,
            idservicio,
            costo,
            anticipo,
            licenciado,
            telefono_licenciado,
            fecha_ingreso,
            numero_expediente,
            fecha_ingreso_ampliacion,
            observaciones,
            ubicacion: sequelize.fn('geometry::STGeomFromText', sequelize.literal(`'${ubicacion}'`), 4326),
            direccion_servicio,
            estado
        });

        res.status(201).send({ message: 'Avaluo creado con éxito', data: nuevoAvaluo });
    } catch (error) {
        console.error('Error al crear avaluo:', error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};


const actualizarAvaluo = async (req, res) => {
    const { idavaluo } = req.params;

    try {
        const avaluo = await Avaluos.findByPk(idavaluo);

        if (!avaluo) {
            return res.status(404).send({ message: 'Servicio no encontrado.' });
        }

        const { idcliente, idservicio, costo, anticipo, licenciado,
            telefono_licenciado, fecha_ingreso, numero_expediente,
            fecha_ingreso_ampliacion, observaciones,
            ubicacion, direccion_servicio, estado } = req.body;

        
        // Preparar datos para la actualización
        const datosActualizados = {
            idcliente,
            idservicio,
            costo,
            anticipo,
            licenciado,
            telefono_licenciado,
            fecha_ingreso,
            numero_expediente,
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
        await avaluo.update(datosActualizados);

        res.status(200).send({ message: 'Servicio actualizado con éxito', data: avaluo });
    } catch (error) {
        console.error('Error al actualizar servicio:', error);
        res.status(500).send({ message: 'Error interno del servidor.', error: error.message });
    }
};

const cambiarEstadoAvaluo = async (req, res) => {
    try {
        const { idavaluo} = req.params;
        const avaluo = await Avaluos.findOne({ where: {idavaluo: idavaluo}});

        avaluo.activo = !avaluo.activo;

        await avaluo.save();

        res.send({ message: 'Estado del servicio actualizado con éxito.', avaluo});
    } catch (error) {
        res.status(500).send({ message: error.message});
    }
};

const eliminarAvaluo = async (req, res) => {
    const { idavaluo } = req.params;

    try{
        await Avaluos.destroy({
            where: { idavaluo: idavaluo }
        });

        res.status(200).send({ message: 'Servicio eliminado definitivamente con éxito'});
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};

module.exports = {
    mostrarAvaluos, crearAvaluo, actualizarAvaluo, cambiarEstadoAvaluo, eliminarAvaluo
}


