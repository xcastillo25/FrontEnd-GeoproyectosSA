const historialServiciosController = require('../controllers').historial_servicios;

module.exports = (app) => {
    app.get('/api/historial-servicios', historialServiciosController.mostrarHistorialServicios);
    app.get('/api/historial-servicios-activos', historialServiciosController.mostrarHistorialServiciosActivos);
    app.post('/api/historial-servicios', historialServiciosController.crearHistorialServicio);
    app.put('/api/historial-servicios/:idhistorial', historialServiciosController.actualizarHistorialServicio);
    app.delete('/api/historial-servicios/:idhistorial', historialServiciosController.eliminarHistorialServicio);
    app.put('/api/estado-historial-servicios/:idhistorial', historialServiciosController.cambiarEstadoHistorialServicio);
};