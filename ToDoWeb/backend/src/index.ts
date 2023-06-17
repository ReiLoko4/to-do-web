import express from "express";
import * as bodyParser from 'body-parser';
import { connectToDatabase } from "./server";
import { config } from "./config/config"

const routes = require('./routes/routes')
const app = express();

connectToDatabase()
    .then(() => {
        app.use(bodyParser.json())
        app.use(routes);
        app.listen(8080, () => {
            console.log(`Server started at http://localhost:${config.server.port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });

