import axios from 'axios';
import './ListTodo.css';
import { useState } from 'react';
import ButtonsListTodo from './ButtonsListTodo/ButtonsListTodo';


export default function ListTodo() {
  const [allTodos, setAllTodos] = useState([])
  axios.get("http://localhost:8080/tasks")
    .then((response) => {
      setAllTodos(response.data)
    })
    return (
    <div className='container-list-todo'>
      {allTodos.map((todo: {_id: String, name: String}, index) => (
      <div key={index} className='list-todo'>
        <p className='edit-todo' >{todo.name}</p>
       <ButtonsListTodo id={todo._id} />
      </div>
      ))}
    </div>
  )
}