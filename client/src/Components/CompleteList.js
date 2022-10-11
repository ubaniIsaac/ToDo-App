import React from 'react'
import { useNavigate } from 'react-router-dom'
import Completed from './Completed'

const CompleteList = ({ completeTodos, onDelete }) => {

    const navigate = useNavigate();

    const nav = () => {
        navigate('/todo')
    }

    return (
        <div className='todolist'>
            {completeTodos.map((todo) =>
            (<Completed
                key={todo.id}
                completeTodo={todo}
                onDelete={onDelete}
            />
            ))}

            <div>
                <button onClick={nav}>To-do</button>
            </div>
        </div>
    )
}

export default CompleteList