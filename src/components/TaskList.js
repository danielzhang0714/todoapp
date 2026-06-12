import { useState } from 'react';

function TaskList(props) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const submitEdit = (event, id) => {
    event.preventDefault();
    if (!editText.trim()) return;
    props.dispatch({ type: 'EDIT_TASK', payload: { id, text: editText } });
    setEditingId(null);
  };

  return (
    <div className="task-grid">
      {props.tasks.map((task) => (
        <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
          {editingId === task.id ? (
            <form onSubmit={(event) => submitEdit(event, task.id)}>
              <input value={editText} onChange={(event) => setEditText(event.target.value)} autoFocus />
              <button type="submit">✓</button>
            </form>
          ) : (
            <>
              <div>
                <p className="task-text">{task.text}</p>
                <span className="task-date">{new Date(task.createdAt).toLocaleString('en-CA', {
                  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                })}</span>
              </div>
              <div className="task-actions">
                <button onClick={() => props.dispatch({ type: 'TOGGLE_COMPLETE', payload: task.id })}>✅</button>
                <button onClick={() => startEdit(task)}>📝</button>
                <button onClick={() => props.dispatch({ type: 'DELETE_TASK', payload: task.id })}>❌</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;