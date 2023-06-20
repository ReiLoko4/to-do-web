import ToDoController from '../controllers/toDoController';
import express from 'express'

const route = express.Router();
const taskControler = new ToDoController();


route.get('/tasks', taskControler.getTasks);
route.post('/tasks', taskControler.postTask);
route.put('/tasks/:id', taskControler.putTask);
route.delete('/tasks/:id', taskControler.deleteTask);

module.exports = route;
