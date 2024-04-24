const { tblclientes }  = require('../models');
const { Op } = require('sequelize');

const mostrarClientes = async (req, res) => {
    try {
        const clientes = await tblclientes.findAll();
        res.status(200).send({ clientes: clientes });
    } catch (error) { 
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
}

const mostrarClientesActivos = async (req, res) => {
    try {
        const clientes = await tblclientes.findAll({
            where: {
                activo: true
            }
        });
        res.status(200).send({ clientes: clientes });
    } catch (error) { 
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
}

const crearCliente = async (req, res) => {
    try {
        const existeCliente = await tblclientes.findOne({
            where: { 
                nit: req.body.nit,
                cui: req.body.cui
             }
        });

        if (existeCliente) {
            return res.status(400).send({ message: 'Ya has registrado este cliente'})
        }

        const nuevoCliente = await tblclientes.create(req.body, { 
            fields: ['nombre', 'apellidos', 'nit', 'cui', 'telefono', 'email', 'direccion', 'activo'], 
            individualHooks: true 
        });
        
        res.status(201).send({ nuevoCliente });
    } catch (error){
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor',  error: error.message });
    }
};

const actualizarCliente = async (req, res) => {
    const { idcliente } = req.params;

    try {
        const cliente = await tblclientes.findByPk(idcliente);

        if (!cliente) {
            return res.status(404).send({ message: 'Cliente no encontrado.' });
        }

        // Actualiza el empleado con los datos proporcionados en el cuerpo de la solicitud
        await cliente.update(req.body);

        res.status(200).send({ message: 'Cliente actualizado con éxito.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};


const eliminarCliente = async (req, res) => {
    const { idcliente } = req.params;

    try{
        await tblclientes.destroy({
            where: { idcliente: idcliente}
        });

        res.status(200).send({ message: 'Cliente eliminado definitivamente con éxito.'});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error interno del servidor', error: error.message})
    }
}

const cambiarEstadoCliente = async (req, res) => { 
    try{
        const { idcliente } = req.params;
        const cliente = await tblclientes.findOne({ where: {idcliente: idcliente}});

        cliente.activo = !cliente.activo;

        await cliente.save();

        res.send({ message: 'Estado del empleado actualizado con éxito.', cliente});
    } catch(error){
        res.status(500).send({ message: error.message});
    }
};

module.exports = {
    mostrarClientes, mostrarClientesActivos,
    crearCliente, actualizarCliente, eliminarCliente,
    cambiarEstadoCliente
};
