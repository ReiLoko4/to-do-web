import express from "express";
import { connectToDatabase } from "./server";
import { taskRouter } from "./routes/routes";
import { config } from "./config/config"

const app = express();

connectToDatabase()
    .then(() => {
        app.use("/tasks", taskRouter);

        app.listen(8080, () => {
            console.log(`Server started at http://localhost:${config.server.port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });

