module.exports = (sequelize, DataTypes) => {
    const Clientes = sequelize.define(
        'tblclientes',
        {
            idcliente: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            nombre: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            apellidos: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            nit: {
                type: DataTypes.STRING(15),
                allowNull: true
            },
            cui: {
                type: DataTypes.STRING(13),
                allowNull: true
            },
            telefono: {
                type: DataTypes.STRING(15),
                allowNull: true
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            direccion: {
                type: DataTypes.STRING(100),
                allowNull: false
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

    return Clientes;
};
