const { sequelize } = require('../models'); 
const { AgrimensuraCatastro, Servicios, Clientes } = require('../models');  // Ajusta la ruta según tu estructura de proyecto
const { Op } = require('sequelize');
const Sequelize = require('sequelize');

const mostrarAgrimensura = async (req, res) => {
    try {
        const agrimensuras = await AgrimensuraCatastro.findAll({
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
        const agrimensurasTransformadas = agrimensuras.map(agrimensura => {
            const plainAgrimensura = agrimensura.get({ plain: true });
            plainAgrimensura.ubicacion = plainAgrimensura.ubicacionTexto || "No definido"; // Usamos el valor de texto
            delete plainAgrimensura.ubicacionTexto; // Eliminamos la propiedad temporal si no se necesita
            return plainAgrimensura;
        });
        res.status(200).send({ agrimensuras: agrimensurasTransformadas });
    } catch (error) {
        console.error('Error al obtener agrimensuras:', error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};


const mostrarAgrimensuraActiva = async (req, res) => {
    try {
        const agrimensuras = await AgrimensuraCatastro.findAll({
            include: [
                {
                    model: Servicios,   // Asegúrate de que 'Servicios' esté correctamente importado
                    as: 'Servicio',     // Este 'as' debe coincidir con el alias definido en la asociación de 'AgrimensuraCatastro' a 'Servicios'
                    attributes: ['servicio']  // Corregido de 'servio' a 'servicio'
                },
                {
                    model: Clientes,    // Asegúrate de que 'Clientes' esté correctamente importado
                    as: 'Cliente',      // Este 'as' debe coincidir con el alias definido en la asociación de 'AgrimensuraCatastro' a 'Clientes'
                    attributes: ['nombre', 'apellidos']  // Asegúrate de que estos atributos existen en el modelo 'Clientes'
                }
            ],
            where: {
                activo: true
            }
        });
        res.status(200).send({ agrimensuras: agrimensuras });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};

const crearAgrimensura = async (req, res) => {
    try {
        const { idcliente, idservicio, impuesto_ric, anticipo, costo, adquiriente,
                telefono_adquiriente, otorgante, telefono_otorgante, fecha_solicitud,
                fecha_compra_certificado_ric, fecha_visita_campo,
                numero_boleta_compra_certificado_ric, fecha_ingreso_expediente_ric,
                numero_boleta_deposito_aprobacion_ric, observaciones, ubicacion,
                direccion_servicio, estado, activo } = req.body;

        console.log("Inserting with WKT:", ubicacion);
 // Asegúrate de que ubicacion contenga las coordenadas en el formato correcto

        const nuevaAgrimensura = await AgrimensuraCatastro.create({
            idcliente,
            idservicio,
            impuesto_ric,
            anticipo,
            costo,
            adquiriente,
            telefono_adquiriente,
            otorgante,
            telefono_otorgante,
            fecha_solicitud,
            fecha_compra_certificado_ric,
            fecha_visita_campo,
            numero_boleta_compra_certificado_ric,
            fecha_ingreso_expediente_ric,
            numero_boleta_deposito_aprobacion_ric,
            observaciones,
            ubicacion: sequelize.fn('geometry::STGeomFromText', sequelize.literal(`'${ubicacion}'`), 4326),
            direccion_servicio,
            estado
        });

        res.status(201).send({ message: 'Agrimensura creada con éxito', data: nuevaAgrimensura });
    } catch (error) {
        console.error('Error al crear agrimensura:', error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};


const actualizarAgrimensura = async (req, res) => {
    const { idagrimensura } = req.params;

    try {
        const agrimensura = await AgrimensuraCatastro.findByPk(idagrimensura);

        if (!agrimensura) {
            return res.status(404).send({ message: 'Servicio no encontrado.' });
        }

        const { idcliente, idservicio, impuesto_ric, anticipo, costo, adquiriente,
            telefono_adquiriente, otorgante, telefono_otorgante, fecha_solicitud,
            fecha_compra_certificado_ric, fecha_visita_campo,
            numero_boleta_compra_certificado_ric, fecha_ingreso_expediente_ric,
            numero_boleta_deposito_aprobacion_ric, observaciones, ubicacion,
            direccion_servicio, estado, activo } = req.body;

        
        // Preparar datos para la actualización
        const datosActualizados = {
            idcliente,
            idservicio,
            impuesto_ric,
            anticipo,
            costo,
            adquiriente,
            telefono_adquiriente,
            otorgante,
            telefono_otorgante,
            fecha_solicitud,
            fecha_compra_certificado_ric,
            fecha_visita_campo,
            numero_boleta_compra_certificado_ric,
            fecha_ingreso_expediente_ric,
            numero_boleta_deposito_aprobacion_ric,
            observaciones,
            ubicacion,
            direccion_servicio,
            estado,
            activo
        };

        // Actualizar la ubicación si se proporciona nueva, utilizando el formato WKT correcto
        if (ubicacion) {
            datosActualizados.ubicacion = sequelize.fn('geometry::STGeomFromText', sequelize.literal(`'${ubicacion}'`), 4326);
        }

        // Ejecutar la actualización
        await agrimensura.update(datosActualizados);

        res.status(200).send({ message: 'Servicio actualizado con éxito', data: agrimensura });
    } catch (error) {
        console.error('Error al actualizar servicio:', error);
        res.status(500).send({ message: 'Error interno del servidor.', error: error.message });
    }
};

const cambiarEstadoAgrimensura = async (req, res) => {
    try {
        const { idagrimensura} = req.params;
        const agrimensura = await AgrimensuraCatastro.findOne({ where: {idagrimensura: idagrimensura}});

        agrimensura.activo = !agrimensura.activo;

        await agrimensura.save();

        res.send({ message: 'Estado del servicio actualizado con éxito.', agrimensura});
    } catch (error) {
        res.status(500).send({ message: error.message});
    }
};

const eliminarAgrimensura = async (req, res) => {
    const { idagrimensura } = req.params;

    try{
        await AgrimensuraCatastro.destroy({
            where: { idagrimensura: idagrimensura }
        });

        res.status(200).send({ message: 'Servicio eliminado definitivamente con éxito'});
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};

module.exports = {
    mostrarAgrimensura, crearAgrimensura, actualizarAgrimensura, cambiarEstadoAgrimensura, eliminarAgrimensura
}


