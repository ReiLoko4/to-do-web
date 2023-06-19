import AddTodo from '../components/AddTodo/AddTodo';
import ListTodo from '../components/ListTodo/ListTodo';
import './Home.css';

export default function Home() {
  return (
    <div className='body'>
      <div className='container'>
        <h1>Todo List</h1>
        <AddTodo />
        <ListTodo />
      </div>
    </div>
  )
}