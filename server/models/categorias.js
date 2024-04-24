module.exports = (sequelize, DataTypes) => {
    const Categorias = sequelize.define(
        'Categorias',
        {
            idcategoria: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            categoria: {
                type: DataTypes.STRING,
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
            tableName: 'tblcategorias'
        }
    );

    Categorias.associate = function(models) {
        Categorias.hasMany(models.Servicios, { foreignKey: 'idcategoria', as: 'Servicios' });
    };
    
    return Categorias;
};
