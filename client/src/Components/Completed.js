import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { FaTimes } from 'react-icons/fa'

// import Todo from "./Todo";


const Completed = ({ completeTodo, onDelete }) => {
    const [complete, setComplete] = useState([])

    const navigate = useNavigate()

    const nav = () => {
        navigate('/todo')
    }

    return (
        <div>
            <div className='todo'>
                <FaTimes className='delete-btn'
                    onClick={() => onDelete(completeTodo.id)} />

                <h3>{completeTodo.text}</h3>
            </div>
        </div>
    )
}

export default Completed