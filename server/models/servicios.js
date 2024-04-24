module.exports = (sequelize, DataTypes) => {
    const Servicios = sequelize.define(
        'Servicios',
        {
            idservicio: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            servicio: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            idcategoria: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'tblcategorias',  // Este modelo debe estar definido en tu proyecto Sequelize
                    key: 'idcategoria'
                }
            },
            detalle: {
                type: DataTypes.TEXT,  // Sequelize usa TEXT para representar varchar(MAX)
                allowNull: true
            },
            observaciones: {
                type: DataTypes.TEXT,  // Sequelize usa TEXT para representar varchar(MAX)
                allowNull: true
            },
            activo: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        },
        {
            timestamps: false,
            tableName: 'tblservicios'
        }
    );

    Servicios.associate = function(models) {
        Servicios.belongsTo(models.Categorias, { foreignKey: 'idcategoria', as: 'Categoria' });
    };


    return Servicios;
};
