import { useReducer } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: Date.now(), text: action.payload, completed: false, createdAt: new Date() }];
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);
    case 'EDIT_TASK':
      return state.map(task =>
        task.id === action.payload.id ? { ...task, text: action.payload.text, createdAt: new Date() } : task
      );
    case 'TOGGLE_COMPLETE':
      return state.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    default:
      return state;
  }
}

const initialState = JSON.parse(localStorage.getItem('tasks')) || [];

function App() {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  return (
    <div className="app">
      <h1>Task Tracker</h1>
      <TaskForm onAdd={(text) => dispatch({ type: 'ADD_TASK', payload: text })} />
      <TaskList tasks={tasks} dispatch={dispatch} />
    </div>
  );
}

export default App;