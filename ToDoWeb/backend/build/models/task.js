"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Task {
    constructor(name, description, isDone, _id) {
        this.name = name;
        this.description = description;
        this.isDone = isDone;
        this._id = _id;
    }
}
exports.default = Task;
