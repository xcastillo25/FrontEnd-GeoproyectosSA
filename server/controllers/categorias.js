const { Categorias }  = require('../models');
const { Op } = require('sequelize');

const mostrarCategorias = async (req, res) => {
    try {
        const categorias = await Categorias.findAll();
        res.status(200).send({ categorias: categorias });
    } catch (error) { 
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
}

const mostrarCategoriasActivas = async (req, res) => {
    try {
        const categorias = await Categorias.findAll({
            where: {
                activo: true
            }
        });
        res.status(200).send({ categorias: categorias });
    } catch (error) { 
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
}

const crearCategoria = async (req, res) => {
    try {
        const existeCategoria = await Categorias.findOne({
            where: { categoria: req.body.categoria }
        });

        if (existeCategoria) {
            return res.status(400).send({ message: 'Ya has registrado esta categoria'})
        }

        const nuevaCategoria = await Categorias.create(req.body, { 
            fields: ['categoria', 'activo'], 
            individualHooks: true 
        });
        
        res.status(201).send({ nuevaCategoria });
    } catch (error){
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor',  error: error.message });
    }
};

const actualizarCategoria = async (req, res) => {
    const { idcategoria } = req.params;

    try {
        const categoria = await Categorias.findByPk(idcategoria);

        if (!categoria) {
            return res.status(404).send({ message: 'Categoria no encontrada.' });
        }

        // Verifica si ya existe otro empleado con el mismo CUI y correo
        const existeCategoria = await Categorias.findOne({
            where: {
                categoria: req.body.categoria
            }
        });

        if (existeCategoria) {
            return res.status(400).send({ message: 'Ya has registrado esta categoria' });
        }

        // Actualiza el empleado con los datos proporcionados en el cuerpo de la solicitud
        await categoria.update(req.body);

        res.status(200).send({ message: 'Categoría actualizada con éxito.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor', error: error.message });
    }
};


const eliminarCategoria = async (req, res) => {
    const { idcategoria } = req.params;

    try{
        await Categorias.destroy({
            where: { idcategoria: idcategoria}
        });

        res.status(200).send({ message: 'Categoría eliminada definitivamente con éxito.'});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error interno del servidor', error: error.message})
    }
}

const cambiarEstadoCategoria = async (req, res) => { 
    try{
        const { idcategoria } = req.params;
        const categoria = await Categorias.findOne({ where: {idcategoria: idcategoria}});

        categoria.activo = !categoria.activo;

        await categoria.save();

        res.send({ message: 'Categoría actualizada con éxito.', categoria});
    } catch(error){
        res.status(500).send({ message: error.message});
    }
};

module.exports = {
    mostrarCategorias, mostrarCategoriasActivas,
    crearCategoria, actualizarCategoria, eliminarCategoria,
    cambiarEstadoCategoria
};
