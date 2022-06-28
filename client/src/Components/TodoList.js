import React from 'react'
import Todo from './Todo.js'

const TodoList = ({ todos, onDelete, onComplete }) => {

    return (
        <div className='todolist'>
            {todos.map((todo) =>
            (<Todo
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                onComplete={onComplete}
            />
            ))}
        </div>
    )
}

export default TodoList