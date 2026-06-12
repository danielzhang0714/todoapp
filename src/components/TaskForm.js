import { useState } from 'react';

function TaskForm() {
    const [text, setText] = useState('');
    const handleSubmit = event => {
        event.preventDefault();
        if(!text.trim()) return;
        setText('');
    }
    return(
        <form className='task-form' onSubmit={handleSubmit}>
            <input type='text' placeholder='enter task' value={text} onChange={event => setText(event.target.value)}/>
            <button type='submit'>Add</button>
        </form>
    )
}