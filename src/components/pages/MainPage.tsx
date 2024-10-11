import { useState } from 'react';

interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

function MainPage() {
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [todo, setTodo] = useState<ITodo[]>([]);

  const addTodos = (text: string) => {
    const newTodo: ITodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    if (newTodo.text.trim() === '') {
      alert('нужно что то вписать');
    } else {
      return setTodo([...todo, newTodo]);
    }
  };

  const toggleTodo = (id: number) => {
    setTodo(
      todo.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  };
  const todoFilter = todo.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
  const deleteCompleted = () => {
    const activeTodos = todo.filter((todo) => !todo.completed);
    setTodo(activeTodos);
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div>
        <h1>todos</h1>
      </div>
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <input
            style={{ border: 'none', fontSize: '20px', outline: 'none' }}
            type="text"
            value={input}
            placeholder="What needs to be done?"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTodos(input);
                setInput('');
              }
            }}
          />
        </div>

        <div style={{ width: '500px' }}>
          {todoFilter.map((todo) => (
            <span
              key={todo.id}
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderBottom: 'solid grey',
                paddingBottom: '15px',
                paddingTop: '15px',
                textDecoration: todo.completed ? 'line-through' : 'none',
                fontSize: '20px',
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: '10px' }}
              />
              {todo.text}
            </span>
          ))}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '500px',
          marginTop: '10px',
        }}
      >
        <div>
          <span>{todo.filter((todo) => !todo.completed).length} itemsleft</span>
        </div>
        <div>
          <button
            onClick={() => setFilter('all')}
            style={{
              border:
                filter === 'all'
                  ? '2px solid rgb(204 212 214)'
                  : '1px solid #ccc',
              marginRight: '10px',
              borderRadius: '3px',
            }}
          >
            all
          </button>
          <button
            onClick={() => setFilter('active')}
            style={{
              border:
                filter === 'active'
                  ? '2px solid rgb(204 212 214)'
                  : '1px solid #ccc',
              marginRight: '10px',
              borderRadius: '3px',
            }}
          >
            active
          </button>
          <button
            onClick={() => setFilter('completed')}
            style={{
              border:
                filter === 'completed'
                  ? '2px solid rgb(204 212 214)'
                  : '1px solid #ccc',
              marginRight: '10px',
              borderRadius: '3px',
            }}
          >
            completed
          </button>
        </div>
        <div>
          <button onClick={deleteCompleted}>clear completed</button>
        </div>
      </div>
    </div>
  );
}
export default MainPage;
