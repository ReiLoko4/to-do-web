import { useState } from "react";
import "./AddTodo.css";
import axios from "axios";
export default function AddTodo() {
  const [nameTodo, setNameTodo] = useState("")
  const addTodo = async () => axios.post("http://localhost:8080/tasks", {
    name: nameTodo,
  })
  return (
    <div className='container-addTodo'>
      <input type='text' placeholder='Add new todo' onChange={(e) => setNameTodo(e.target.value)}/>
      <button className='add-button' onClick={() => addTodo()}>+</button>
    </div>
  )
}