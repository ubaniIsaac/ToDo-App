import React from 'react'
import { FaTimes } from 'react-icons/fa'

const Todo = ({ todo, onDelete, onComplete }) => {
    return (
        <div className='todo'>
            <FaTimes className='delete-btn'
                onClick={() => onDelete(todo.id)} />

            <h3>{todo.text}</h3>

            <input type='checkbox'
                onClick={() => onComplete(todo.id)}></input>
        </div>
    )
}

export default Todo