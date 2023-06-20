import { useState } from "react";
import "./AddTodo.css";
import axios from "axios";
export default function AddTodo() {
  const [nameTodo, setNameTodo] = useState("")

  const addTodo = async (e: any) => {
    if (nameTodo.length != 0) {
      axios.post("http://localhost:8080/tasks", {
        name: nameTodo,
        isDone: false
      })
    }
    setNameTodo('')
    e.preventDefault()
  }

  return (
    <form className='container-addTodo' onSubmit={(e) => addTodo(e)}>
      <input type='text' placeholder='Adicionar nova tarefa' value={nameTodo} 
        onChange={(e) => setNameTodo(e.target.value)} 
        onSubmit={(e) => setNameTodo(e.currentTarget.value)
      }/>
      <button type={'submit'} className='add-button'>+</button>
    </form>
  )
}