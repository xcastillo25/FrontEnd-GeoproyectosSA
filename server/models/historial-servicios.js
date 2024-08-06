module.exports = (sequelize, DataTypes) => {
    const Historial_Servicios = sequelize.define(
        'Historial_Servicios',
        {
            idhistorial: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            idservicio: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            tipo_servicio: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            fecha_proceso: {
                type: DataTypes.DATE,
                allowNull: false
            },
            descripcion: {
                type: DataTypes.STRING(150),
                allowNull: false
            },
            id_empleado: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'tblempleados',  // Referencia al modelo `tblempleados`
                    key: 'idempleado'
                }
            },
            observaciones: {
                type: DataTypes.STRING(150),
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
            }
        },
        {
            timestamps: false,
            tableName: 'tblhistorial_servicios'
        }
    );

    Historial_Servicios.associate = function(models) {
        Historial_Servicios.belongsTo(models.tblempleados, { foreignKey: 'id_empleado', as: 'Empleado' });
    };

    return Historial_Servicios;
};
