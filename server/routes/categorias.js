const categoriasController = require('../controllers').categorias;

module.exports = (app) => {
    app.get('/api/categorias', categoriasController.mostrarCategorias);
    app.get('/api/categorias-activos', categoriasController.mostrarCategoriasActivas);
    app.post('/api/categorias', categoriasController.crearCategoria);
    app.put('/api/categorias/:idcategoria', categoriasController.actualizarCategoria);
    app.delete('/api/categorias/:idcategoria', categoriasController.eliminarCategoria);
    app.put('/api/estado-categorias/:idcategoria', categoriasController.cambiarEstadoCategoria);
}