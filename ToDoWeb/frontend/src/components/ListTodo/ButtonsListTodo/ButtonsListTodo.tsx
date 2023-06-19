import axios from "axios";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";

export default function ButtonsListTodo(props: {id: String}) {
  const deleteTodo = async () => await axios.delete(`http://localhost:8080/tasks/${props.id}`)
    return (
      <div className='list-todo-buttons'>
        <button className='icon-button'><AiTwotoneEdit /></button>
        <button className='icon-button' onClick={() => deleteTodo()}><AiFillDelete /></button>
      </div>
    )
}