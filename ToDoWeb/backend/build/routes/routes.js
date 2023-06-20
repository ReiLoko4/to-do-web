"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toDoController_1 = __importDefault(require("../controllers/toDoController"));
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
const taskControler = new toDoController_1.default();
route.get('/tasks', taskControler.getTasks);
route.post('/tasks', taskControler.postTask);
route.put('/tasks/:id', taskControler.putTask);
route.delete('/tasks/:id', taskControler.deleteTask);
module.exports = route;
