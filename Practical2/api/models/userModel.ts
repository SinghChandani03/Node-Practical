import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import { UserAttributes, UserCreationAttributes } from "../types/userTypes"; 

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    userId!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    createdAt!: Date; 
    createdBy?: string;
}

User.init({
    userId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    createdBy: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
}, {
    tableName: 'User',
    sequelize,
    timestamps: false,
});

export default User;
