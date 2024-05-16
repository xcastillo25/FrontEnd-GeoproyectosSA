const avaluoController = require('../controllers').avaluos;

module.exports = (app) => {
    app.get('/api/avaluos', avaluoController.mostrarAvaluos);
    // app.get('/api/agrimensuras-activo', agrimensuraController.mostrarAgrimensura);
    app.post('/api/avaluos', avaluoController.crearAvaluo);
    app.put('/api/avaluos/:idavaluo', avaluoController.actualizarAvaluo);
    app.delete('/api/avaluos/:idavaluo', avaluoController.eliminarAvaluo);
    app.put('/api/estado-avaluos/:idavaluo', avaluoController.cambiarEstadoAvaluo);
}