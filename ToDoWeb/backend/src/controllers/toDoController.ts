import { connectToDatabase, collections } from '../server';
import Task from '../models/task';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';


connectToDatabase()

export default class ToDoController {

    async getTasks (req: Request, res: Response) {
        try{
            const tasks = (await collections.tasks?.find({}).toArray()) as Task[];
            res.status(200).send(tasks);
        } 
        catch{
            res.status(500)
        }
    };

    async postTask(req: Request, res: Response) {
        try{
            const newTask = req.body as Task;
            const result = await collections.tasks?.insertOne(newTask);
            result
                ? res.status(200).send(`Successfully created a new task with id ${result.insertedId}`)
                : res.status(304).send('Failed to create a new task.');
        }
        catch (error){
            res.status(400).send(error)
        }
    };
    async putTask(req:Request, res:Response) {
        const id = req?.params?.id;
        try {
            const updatedGame: Task = req.body as Task;
            const query = { _id: new ObjectId(id) };

            const result = await collections.tasks?.updateOne(query, { $set: updatedGame });

            result
                ? res.status(200).send(`Successfully updated task with id ${id}`)
                : res.status(304).send(`Task with id: ${id} not updated`);
        } catch (error) {
            res.status(400).send(error);
        }
    };

    async deleteTask (req: Request, res: Response) {
        const id = req?.params?.id;

        try {
            const query = { _id: new ObjectId(id) };
            const result = await collections.tasks?.deleteOne(query);

            if (result && result.deletedCount) {
                res.status(200).send(`Successfully removed task with id ${id}`);
            } else if (!result) {
                res.status(304).send(`Failed to remove task with id ${id}`);
            } else if (!result.deletedCount) {
                res.status(404).send(`Task with id ${id} does not exist`);
            }
        } catch (error) {
            res.status(400).send(error);
        }
    };
}
