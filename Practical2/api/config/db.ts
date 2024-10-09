import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10),
    dialect: "postgres",
    logging: false,
  }
);

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); 
    console.log("Database & tables synced!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

syncDatabase();

export default sequelize;
