import { ObjectId } from "mongodb";

export default class Task {
    constructor(
        public name: string, 
        public description: string, 
        public isDone: boolean, 
        public _id?: ObjectId
    ) {}
}
