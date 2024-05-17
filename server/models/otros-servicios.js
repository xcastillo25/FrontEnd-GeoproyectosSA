module.exports = (sequelize, DataTypes) => {
    const OtrosServicios = sequelize.define(
        'OtrosServicios',
        {
            idotro_servicio: {
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
            fecha_entrega: {
                type: DataTypes.DATE,
                allowNull: true
            },
            observaciones: {
                type: DataTypes.TEXT,  // Sequelize usa TEXT para representar varchar(MAX)
                allowNull: true
            },
            estado: {
                type: DataTypes.STRING(25),
                allowNull: true
            },
            recibo: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            },
            activo: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        },
        {
            timestamps: false,
            tableName: 'tblotros_servicios'
        }
    );

    OtrosServicios.associate = function(models) {
        // Asociar con el modelo Clientes
        OtrosServicios.belongsTo(models.Clientes, { foreignKey: 'idcliente', as: 'Cliente' });

        // Asociar con el modelo Servicios
        OtrosServicios.belongsTo(models.Servicios, { foreignKey: 'idservicio', as: 'Servicio' });

        // Otras asociaciones...
    };

    return OtrosServicios;
};
