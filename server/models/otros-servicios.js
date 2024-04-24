module.exports = (sequelize, DataTypes) => {
    const OtrosServicios = sequelize.define(
        'tblotros_servicios',
        {
            idotro_servicio: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            id_cliente: {
                type: DataTypes.INTEGER,
                allowNull: true,  // Nullable porque la referencia no indica explícitamente `not null`
                references: {
                    model: 'tblclientes',  // Este modelo debe estar definido en tu proyecto Sequelize
                    key: 'idcliente'
                }
            },
            id_servicio: {
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
                allowNull: true
            },
            activo: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        },
        {
            timestamps: false
        }
    );

    return OtrosServicios;
};
