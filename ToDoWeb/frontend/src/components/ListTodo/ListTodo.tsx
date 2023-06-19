import './ListTodo.css';
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai'

export default function ListTodo() {
  return (
    <div className='container-list-todo'>
      <div className='list-todo'>
        <p>Example</p>
        <div className='list-todo-buttons'>
          <button className='icon-button'><AiTwotoneEdit /></button>
          <button className='icon-button'><AiFillDelete /></button>
        </div>
      </div>
    </div>
  )
}