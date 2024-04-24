module.exports = (sequelize, DataTypes) => {
    const Permisos = sequelize.define(
        'tblpermisos',
        {
            idpermiso: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            administrador: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            servicios: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            contabilidad: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            campo: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            agenda: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            activo: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            timestamps: false
        }
    );

    return Permisos;
};
