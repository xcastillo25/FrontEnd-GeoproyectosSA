const { Servicios, Categorias } = require('../models');  // Ajusta la ruta según tu estructura de proyecto

const mostrarServicios = async (req, res) => {
    try {
        const servicios = await Servicios.findAll({
            include: [{
                model: Categorias,   // Utiliza el modelo importado
                as: 'Categoria',     // Este 'as' debe coincidir con el alias definido en la asociación
                attributes: ['categoria']  // Asegúrate de que 'categoria' es el campo correcto que deseas mostrar
            }]
        });
        res.status(200).send({ servicios: servicios });
    } catch (error) { 
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
}

const filtrarPorAgrimensuras = async (req, res) => {
    try {
        const servicios = await Servicios.findAll({
            include: [{
                model: Categorias,
                as: 'Categoria',
                attributes: ['categoria'],
                where: {
                    categoria: ['Agrimensura', 'Catastro'] // Filtra por las categorías deseadas
                }
            }]
        });
        res.status(200).send({ servicios: servicios });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};


const filtrarPorAvaluos = async (req, res) => {
    try {
        const servicios = await Servicios.findAll({
            include: [{
                model: Categorias,
                as: 'Categoria',
                attributes: ['categoria'],
                where: {
                    categoria: ['Avaluos'] // Filtra por las categorías deseadas
                }
            }]
        });
        res.status(200).send({ servicios: servicios });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};


const filtrarPorLicencias = async (req, res) => {
    try {
        const servicios = await Servicios.findAll({
            include: [{
                model: Categorias,
                as: 'Categoria',
                attributes: ['categoria'],
                where: {
                    categoria: ['Licencias Ambientales'] // Filtra por las categorías deseadas
                }
            }]
        });
        res.status(200).send({ servicios: servicios });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};

const filtrarPorOtrosServicios = async (req, res) => {
    try {
        const servicios = await Servicios.findAll({
            include: [{
                model: Categorias,
                as: 'Categoria',
                attributes: ['categoria'],
                where: {
                    categoria: ['Servicios de Impresión', 'Vuelos de Dron', 'Planos Arquitectónicos'] // Filtra por las categorías deseadas
                }
            }]
        });
        res.status(200).send({ servicios: servicios });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};


const mostrarServiciosActivos = async (req, res) => {
    try {
        const servicios = await Servicios.findAll({
            include: [{
                model: Categorias,   // Utiliza el modelo importado
                as: 'Categoria',     // Este 'as' debe coincidir con el alias definido en la asociación
                attributes: ['categoria']  // Asegúrate de que 'categoria' es el campo correcto que deseas mostrar
            }],
            where: {
                activo: true
            }
        });
        res.status(200).send({ servicios: servicios });
    } catch (error) { 
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
}

const crearServicio = async (req, res) => {
    try {
        const existeServicio = await Servicios.findOne({
            where: { servicio: req.body.servicio}
        });

        if (existeServicio) {
            return res.status(400).send({ message: 'Ya has registrado este servicio'})
        }

        const nuevoServicio = await Servicios.create(req.body, { 
            fields: ['servicio', 'idcategoria', 'detalle', 'observaciones', 'activo'], 
            individualHooks: true 
        });
        
        res.status(201).send({ nuevoServicio });
    } catch (error){
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor',  error: error.message });
    }
};

const actualizarServicio = async (req, res) => {
    const { idservicio } = req.params;

    try {
        const servicio = await Servicios.findByPk(idservicio);

        if (!servicio) {
            return res.status(404).send({ message: 'Servicio no encontrado.' });
        }

        // Actualiza el empleado con los datos proporcionados en el cuerpo de la solicitud
        await servicio.update(req.body);

        res.status(200).send({ message: 'Servicio actualizado con éxito.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};


const eliminarServicio = async (req, res) => {
    const { idservicio } = req.params;

    try{
        await Servicios.destroy({
            where: { idservicio: idservicio}
        });

        res.status(200).send({ message: 'Servicio eliminado definitivamente con éxito.'});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error interno del servidor', error: error.message})
    }
}

const cambiarEstadoServicio = async (req, res) => { 
    try{
        const { idservicio } = req.params;
        const servicio = await Servicios.findOne({ where: {idservicio: idservicio}});

        servicio.activo = !servicio.activo;

        await servicio.save();

        res.send({ message: 'Estado del servicio actualizado con éxito.', servicio});
    } catch(error){
        res.status(500).send({ message: error.message});
    }
};

module.exports = {
    mostrarServicios, mostrarServiciosActivos,
    crearServicio, actualizarServicio, eliminarServicio,
    cambiarEstadoServicio, filtrarPorAgrimensuras, filtrarPorAvaluos,
    filtrarPorLicencias, filtrarPorOtrosServicios
};
