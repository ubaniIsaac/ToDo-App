import React from 'react'
import { FaTimes } from 'react-icons/fa'
import '../Styles/Todo.css'

const Todo = ({ todo, onDelete, onComplete }) => {
    return (
        <div className='todo'>
            <FaTimes style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => onDelete(todo.id)} />
            <input type='checkbox'
                onClick={() => onComplete(todo, todo.id)}></input>
            <h3>{todo.text}</h3>
            {/* <p>{todo.day}</p> */}

        </div>
    )
}

export default Todo