import { Optional } from "sequelize";

export interface UserAttributes {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;  
    createdBy?: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'userId' | 'createdAt'> {}
