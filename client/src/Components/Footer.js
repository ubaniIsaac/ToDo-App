import React from 'react'
import { Navigate } from 'react-ionicons'
import { useNavigate } from 'react-router-dom'

const Footer = () => {

    const navigate = useNavigate()


    const nav = () => {
        navigate('/completed')
    }

    return (
        <div>
            <button className="complete-btn" onClick={nav}>Completed</button>
        </div>
    )
}

export default Footer