module.exports = (sequelize, DataTypes) => {
    const Usuarios = sequelize.define(
        'tblusuarios',
        {
            idusuario: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            idempleado: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'tblempleados',
                    key: 'idempleado'
                }
            },
            usuario: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            password: {
                type: DataTypes.STRING(255),
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
        }
    );

    return Usuarios;
};
