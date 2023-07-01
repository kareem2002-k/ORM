


module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        , allowNull: false,
        validate : {
            notEmpty : true
        }

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
            notEmpty : true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
            notEmpty : true
        }
    },
    gpa : {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate : {
            notEmpty : true
        }
    }

    }, {});
    Student.associate = function(models) {
        // associations can be defined here
    };
    return Student;
    }
    