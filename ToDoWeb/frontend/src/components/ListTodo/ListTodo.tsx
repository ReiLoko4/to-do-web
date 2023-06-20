import axios from 'axios';
import { useEffect, useState } from 'react';
import ButtonsListTodo from './ButtonsListTodo/ButtonsListTodo';
import './ListTodo.css';
import { AiOutlineCheck } from 'react-icons/ai';

export default function ListTodo() {
  const [allTodos, setAllTodos] = useState([]);
  const [isEditableTodo, setIsEditableTodo] = useState(false);
  const [valueEditableTodo, setValueEditableTodo] = useState('');
  const [currentId, setCurrentId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/tasks').then((response) => {
      setAllTodos(response.data);
    });
  }, [allTodos]);

  const editTodo = async (nameEditted: string) => {
    axios.put(`http://localhost:8080/tasks/${currentId}`, {
      name: nameEditted,
    });
  };

  return (
    <div className='container-list-todo'>
      {allTodos.map((todo: { _id: string; name: string, isDone: boolean}) => (
        <div key={todo._id} className='list-todo'>
          {todo._id === currentId && isEditableTodo ? (
            <> 
              <input
                type='text'
                className={isEditableTodo ? 'edit-todo' : ''}
                disabled={!isEditableTodo}
                value={valueEditableTodo}
                onChange={(e) => setValueEditableTodo(e.target.value)}
              />
              <AiOutlineCheck
                className='edit-todo-button'
                onClick={() => {
                  editTodo(valueEditableTodo);
                  setIsEditableTodo(false);
                  setCurrentId(currentId);
                }}
              />
            </>
          ) : (
            <input type='text' disabled={true} value={todo.name} />
          )}
          <ButtonsListTodo
            id={todo._id}
            setIsEditableTodo={setIsEditableTodo}
            isEditableTodo={isEditableTodo}
            setCurrentId={setCurrentId}
            valueEditableTodo={valueEditableTodo}
            isDone={todo.isDone}
          />
        </div>
      ))}
    </div>
  );
}
