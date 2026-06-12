function TaskForm() {
    const handleSubmit = event => {
        event.preventDefault();

    }
    return(
        <form className='task-form' onSubmit={handleSubmit}>
            <input type='text' placeholder='enter task' />
            <button type='submit'>Add</button>
        </form>
    )
}