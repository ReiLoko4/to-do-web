import "./AddTodo.css";
export default function AddTodo() {
  return (
    <div className='container-addTodo'>
      <input type='text' placeholder='Add new todo' />
      <button className='add-button'>+</button>
    </div>
  )
}