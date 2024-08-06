module.exports = (sequelize, DataTypes) => {
    const ViewServicios = sequelize.define(
        'viewservicios',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            idcliente: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            nombre_cliente: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            apellidos_cliente: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            idservicio: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            nombre_servicio: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            costo: {
                type: DataTypes.DECIMAL(18, 2),
                allowNull: false
            },
            anticipo: {
                type: DataTypes.DECIMAL(18, 2),
                allowNull: true
            },
            fecha_ingreso: {
                type: DataTypes.DATE,
                allowNull: true
            },
            observaciones: {
                type: DataTypes.STRING,
                allowNull: true
            },
            estado: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            activo: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            tipo_servicio: {
                type: DataTypes.STRING(50),
                allowNull: false
            }
        },
        {
            timestamps: false,
            tableName: 'viewservicios',
            freezeTableName: true
        }
    );

    return ViewServicios;
};
