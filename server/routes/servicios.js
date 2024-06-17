const serviciosController = require('../controllers').servicios;

module.exports = (app) => {
    app.get('/api/servicios', serviciosController.mostrarServicios);
    app.get('/api/servicios/filtrar/agrimensura', serviciosController.filtrarPorAgrimensuras);
    app.get('/api/servicios/filtrar/avaluos', serviciosController.filtrarPorAvaluos);
    app.get('/api/servicios/filtrar/licencias', serviciosController.filtrarPorLicencias);
    app.get('/api/servicios/filtrar/otros-servicios', serviciosController.filtrarPorOtrosServicios);
    app.get('/api/servicios-activos', serviciosController.mostrarServiciosActivos);
    app.post('/api/servicios', serviciosController.crearServicio);
    app.put('/api/servicios/:idservicio', serviciosController.actualizarServicio);
    app.delete('/api/servicios/:idservicio', serviciosController.eliminarServicio);
    app.put('/api/estado-servicios/:idservicio', serviciosController.cambiarEstadoServicio);
}