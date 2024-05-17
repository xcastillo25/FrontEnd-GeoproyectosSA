const empresas = require('./empresas');
const empleados = require('./empleados');
const photos = require('./photos');
const usuarios = require('./usuarios');
const roles = require('./roles');
const login = require('./login');
const categorias = require('./categorias');
const servicios = require('./servicios');
const clientes = require('./clientes');
const agrimensura = require('./agrimensura-catastro');
const avaluos = require('./avaluos');
const licencias = require('./licencias-ambientales');
const otros_servicios = require('./otros-servicios');

module.exports = {
    empresas, empleados, photos, usuarios, roles, login, categorias,
    servicios, clientes, agrimensura, avaluos, licencias, otros_servicios
}