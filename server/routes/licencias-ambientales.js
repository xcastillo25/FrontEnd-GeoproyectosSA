const licenciaController = require('../controllers').licencias;

module.exports = (app) => {
    app.get('/api/licencias', licenciaController.mostrarLicenciaAmbiental);
    // app.get('/api/agrimensuras-activo', agrimensuraController.mostrarAgrimensura);
    app.post('/api/licencias', licenciaController.crearLicenciaAmbiental);
    app.put('/api/licencias/:idlicencia', licenciaController.actualizarLicenciaAmbiental);
    app.delete('/api/licencias/:idlicencia', licenciaController.eliminarLicenciaAmbiental);
    app.put('/api/estado-licencias/:idlicencia', licenciaController.cambiarEstadoLicenciaAmbiental);
}