const agrimensuraController = require('../controllers').agrimensura;

module.exports = (app) => {
    app.get('/api/agrimensuras', agrimensuraController.mostrarAgrimensura);
    // app.get('/api/agrimensuras-activo', agrimensuraController.mostrarAgrimensura);
    app.post('/api/agrimensuras', agrimensuraController.crearAgrimensura);
    app.put('/api/agrimensuras/:idagrimensura', agrimensuraController.actualizarAgrimensura);
    app.delete('/api/agrimensuras/:idagrimensura', agrimensuraController.eliminarAgrimensura);
    app.put('/api/estado-agrimensuras/:idagrimensura', agrimensuraController.cambiarEstadoAgrimensura);
}