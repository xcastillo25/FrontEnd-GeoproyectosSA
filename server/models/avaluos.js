module.exports = (sequelize, DataTypes) => {
    const Avaluos = sequelize.define(
        'Avaluos',
        {
            idavaluo: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            idcliente: {
                type: DataTypes.INTEGER,
                allowNull: true,  // Nullable porque la referencia no indica explícitamente `not null`
                references: {
                    model: 'tblclientes',  // Este modelo debe estar definido en tu proyecto Sequelize
                    key: 'idcliente'
                }
            },
            idservicio: {
                type: DataTypes.INTEGER,
                allowNull: true,  // Nullable porque la referencia no indica explícitamente `not null`
                references: {
                    model: 'tblservicios',  // Este modelo debe estar definido en tu proyecto Sequelize
                    key: 'idservicio'
                }
            },
            costo: {
                type: DataTypes.DECIMAL(18, 2),
                allowNull: false
            },
            anticipo: {
                type: DataTypes.DECIMAL(18, 2),
                allowNull: true
            },
            licenciado: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            telefono_licenciado: {
                type: DataTypes.STRING(15),
                allowNull: true
            },
            fecha_ingreso: {
                type: DataTypes.DATE,
                allowNull: false
            },
            numero_expediente: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            fecha_ingreso_ampliacion: {
                type: DataTypes.DATE,
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
            tableName: 'tblavaluos'
        }
    );

    Avaluos.associate = function(models) {
        // Asociar con el modelo Clientes
        Avaluos.belongsTo(models.Clientes, { foreignKey: 'idcliente', as: 'Cliente' });

        // Asociar con el modelo Servicios
        Avaluos.belongsTo(models.Servicios, { foreignKey: 'idservicio', as: 'Servicio' });

        // Otras asociaciones...
    };

    return Avaluos;
};
