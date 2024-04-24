const serviciosController = require('../controllers').servicios;

module.exports = (app) => {
    app.get('/api/servicios', serviciosController.mostrarServicios);
    app.get('/api/servicios-activos', serviciosController.mostrarServiciosActivos);
    app.post('/api/servicios', serviciosController.crearServicio);
    app.put('/api/servicios/:idservicio', serviciosController.actualizarServicio);
    app.delete('/api/servicios/:idservicio', serviciosController.eliminarServicio);
    app.put('/api/estado-servicios/:idservicio', serviciosController.cambiarEstadoServicio);
}