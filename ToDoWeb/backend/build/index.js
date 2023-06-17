"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("./server");
const routes_1 = require("./routes/routes");
const config_1 = require("./config/config");
const app = (0, express_1.default)();
(0, server_1.connectToDatabase)()
    .then(() => {
    app.use("/tasks", routes_1.taskRouter);
    app.listen(8080, () => {
        console.log(`Server started at http://localhost:${config_1.config.server.port}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
