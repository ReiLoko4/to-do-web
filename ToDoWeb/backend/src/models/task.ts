import { ObjectId } from "mongodb";

export default class Task {
    constructor(
        public name: string, 
        public isDone: boolean, 
        public _id?: ObjectId
    ) {}
}
