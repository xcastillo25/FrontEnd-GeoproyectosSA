module.exports = (sequelize, DataTypes) => {
    const AgrimensuraCatastro = sequelize.define(
        'AgrimensuraCatastro',
        {
            idagrimensura: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            idcliente: {
                type: DataTypes.INTEGER,
                allowNull: true,  // Nullable porque la referencia no indica explicitamente `not null`
                references: {
                    model: 'tblclientes',  // Este modelo debe estar definido en tu proyecto Sequelize
                    key: 'idcliente'
                }
            },
            idservicio: {
                type: DataTypes.INTEGER,
                allowNull: true,  // Nullable porque la referencia no indica explicitamente `not null`
                references: {
                    model: 'tblservicios',  // Este modelo debe estar definido en tu proyecto Sequelize
                    key: 'idservicio'
                }
            },
            impuesto_ric: {
                type: DataTypes.DECIMAL(18, 2),
                allowNull: true
            },
            anticipo: {
                type: DataTypes.DECIMAL(18, 2),
                allowNull: true
            },
            costo: {
                type: DataTypes.DECIMAL(18, 2),
                allowNull: false
            },
            adquiriente: {
                type: DataTypes.STRING(250),
                allowNull: true
            },
            telefono_adquiriente: {
                type: DataTypes.STRING(15),
                allowNull: true
            },
            otorgante: {
                type: DataTypes.STRING(250),
                allowNull: true
            },
            telefono_otorgante: {
                type: DataTypes.STRING(15),
                allowNull: true
            },
            fecha_solicitud: {
                type: DataTypes.DATE,
                allowNull: false
            },
            fecha_compra_certificado_ric: {
                type: DataTypes.DATE,
                allowNull: false
            },
            fecha_visita_campo: {
                type: DataTypes.DATE,
                allowNull: false
            },
            numero_boleta_compra_certificado_ric: {
                type: DataTypes.STRING(25),
                allowNull: true
            },
            fecha_ingreso_expediente_ric: {
                type: DataTypes.DATE,
                allowNull: true
            },
            numero_boleta_deposito_aprobacion_ric: {
                type: DataTypes.STRING(25),
                allowNull: true
            },
            observaciones: {
                type: DataTypes.TEXT,  // Sequelize usa TEXT para representar varchar(MAX)
                allowNull: true
            },
            recibo: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            },
            ubicacion: {
                type: DataTypes.GEOMETRY('POINT', 4326),
                allowNull: true
            },
            direccion_servicio: {
                type: DataTypes.TEXT,  // Sequelize usa TEXT para representar varchar(MAX)
                allowNull: true
            },
            estado: {
                type: DataTypes.STRING(25),
                allowNull: true
            },
            activo: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        },
        {
            timestamps: false,
            tableName: 'tblagrimensura_catastro'
        }
    );

    AgrimensuraCatastro.associate = function(models) {
        // Asociar con el modelo Clientes
        AgrimensuraCatastro.belongsTo(models.Clientes, { foreignKey: 'idcliente', as: 'Cliente' });

        // Asociar con el modelo Servicios
        AgrimensuraCatastro.belongsTo(models.Servicios, { foreignKey: 'idservicio', as: 'Servicio' });

        // Otras asociaciones...
    };

    return AgrimensuraCatastro;
};
