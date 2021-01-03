
module.exports = (sequelize, DataType) => {

    const Todos = sequelize.define('Todos', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        done: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        classMethods: {
            associate: (models) => {
                Todos.belongsTo(models.Users);
            }
        }
    });
    return Todos;
};