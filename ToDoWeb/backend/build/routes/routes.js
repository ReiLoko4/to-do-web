"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const server_1 = require("../server");
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
exports.taskRouter = express_1.default.Router();
exports.taskRouter.use(express_1.default.json());
(0, server_1.connectToDatabase)();
exports.taskRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tasks = (yield ((_a = server_1.collections.tasks) === null || _a === void 0 ? void 0 : _a.find({}).toArray()));
        res.status(200).send(tasks);
    }
    catch (_b) {
        res.status(500);
    }
}));
exports.taskRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const newTask = req.body;
        const result = yield ((_c = server_1.collections.tasks) === null || _c === void 0 ? void 0 : _c.insertOne(newTask));
        result
            ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");
    }
    catch (_d) {
        console.log('wtf');
        res.send('a requisição falhou!');
    }
}));
exports.taskRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    const id = (_e = req === null || req === void 0 ? void 0 : req.params) === null || _e === void 0 ? void 0 : _e.id;
    try {
        const updatedGame = req.body;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_f = server_1.collections.tasks) === null || _f === void 0 ? void 0 : _f.updateOne(query, { $set: updatedGame }));
        result
            ? res.status(200).send(`Successfully updated game with id ${id}`)
            : res.status(304).send(`Game with id: ${id} not updated`);
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}));
exports.taskRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    const id = (_g = req === null || req === void 0 ? void 0 : req.params) === null || _g === void 0 ? void 0 : _g.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_h = server_1.collections.tasks) === null || _h === void 0 ? void 0 : _h.deleteOne(query));
        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed game with id ${id}`);
        }
        else if (!result) {
            res.status(400).send(`Failed to remove game with id ${id}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`Game with id ${id} does not exist`);
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}));
