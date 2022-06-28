import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Todo from "./Todo";

const Completed = () => {
    const [complete, setComplete] = useState([])

    const API_URL = 'http://localhost:5000';


    useEffect(() => {
        fetchCompleted()
    }, [])

    const fetchCompleted = async () => {
        const res = await fetch(`${API_URL}/completed`)
        const data = await res.json()

        setComplete(data)
    }

    const navigate = useNavigate()

    const nav = () => {
        navigate('/todo')
    }

    return (
        <div>
            <div>Completed</div>
            <div className='todolist'>


            </div>
            <button onClick={nav}>To-Dos</button>
            <div></div>
        </div>
    )
}

export default Completed