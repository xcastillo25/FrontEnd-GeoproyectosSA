const otroservicioController = require('../controllers').otros_servicios;

module.exports = (app) => {
    app.get('/api/otrosservicios', otroservicioController.mostrarOtroServicio);
    // app.get('/api/agrimensuras-activo', otroservicioController.mostrarAgrimensura);
    app.post('/api/otrosservicios', otroservicioController.crearOtroServicio);
    app.put('/api/otrosservicios/:idotro_servicio', otroservicioController.actualizarOtroServicio);
    app.delete('/api/otrosservicios/:idotro_servicio', otroservicioController.eliminarOtroServicio);
    app.put('/api/estado-otrosservicios/:idotro_servicio', otroservicioController.cambiarEstadoOtroServicio);
}