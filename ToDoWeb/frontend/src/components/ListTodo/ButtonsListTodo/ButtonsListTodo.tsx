import axios from 'axios';
import { Dispatch, SetStateAction, useState} from 'react';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';

export default function ButtonsListTodo(props: {id: string, setIsEditableTodo: Dispatch<SetStateAction<boolean>>, isEditableTodo: boolean, setCurrentId: any, valueEditableTodo: any, isDone: boolean}) {
  const [isChecked, setValueCheckedTodo] = useState(props.isDone)
  const deleteTodo = async () => await axios.delete(`http://localhost:8080/tasks/${props.id}`)
  const togleCheck = async (value: boolean) => await (axios.put(`http://localhost:8080/tasks/${props.id}`, {isDone: !value}))
    return (
      <div className='list-todo-buttons'>
        <input className='icon-button' type='checkbox' checked={isChecked} 
        onChange={ e => (
            setValueCheckedTodo(e.target.checked),
            togleCheck(!e.target.checked)
          )
        }/>
        <button className='icon-button' onClick={
          () => {
            props.setCurrentId(props.id)
            props.setIsEditableTodo(!props.isEditableTodo)
          }}><AiTwotoneEdit /></button>
        <button className='icon-button' onClick={() => deleteTodo()}><AiFillDelete /></button>
      </div>
    )
}