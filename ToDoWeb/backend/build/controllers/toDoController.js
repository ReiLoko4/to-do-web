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
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const mongodb_1 = require("mongodb");
(0, server_1.connectToDatabase)();
class ToDoController {
    getTasks(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = (yield ((_a = server_1.collections.tasks) === null || _a === void 0 ? void 0 : _a.find({}).toArray()));
                res.status(200).send(tasks);
            }
            catch (_b) {
                res.status(500);
            }
        });
    }
    ;
    postTasks(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newTask = req.body;
                const result = yield ((_a = server_1.collections.tasks) === null || _a === void 0 ? void 0 : _a.insertOne(newTask));
                result
                    ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
                    : res.status(500).send("Failed to create a new game.");
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    ;
    putTask(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
            try {
                const updatedGame = req.body;
                const query = { _id: new mongodb_1.ObjectId(id) };
                const result = yield ((_b = server_1.collections.tasks) === null || _b === void 0 ? void 0 : _b.updateOne(query, { $set: updatedGame }));
                result
                    ? res.status(200).send(`Successfully updated game with id ${id}`)
                    : res.status(304).send(`Game with id: ${id} not updated`);
            }
            catch (error) {
                console.error(error);
                res.status(400).send(error);
            }
        });
    }
    ;
    deleteTask(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
            try {
                const query = { _id: new mongodb_1.ObjectId(id) };
                const result = yield ((_b = server_1.collections.tasks) === null || _b === void 0 ? void 0 : _b.deleteOne(query));
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
        });
    }
    ;
}
exports.default = ToDoController;
