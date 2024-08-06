const viewServiciosController = require('../controllers').viewservicios;

module.exports = (app) => {
    app.get('/api/viewservicios', viewServiciosController.getAllServicios);
};