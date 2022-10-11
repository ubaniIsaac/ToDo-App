import React, { useState } from 'react'
import DatePicker from "react-date-picker"
import { AddOutline } from 'react-ionicons'
// import '../Styles/AddTodos.css'


const AddTodos = ({ onAdd }) => {

    const [text, setText] = useState('')

    let invalid = false
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!text) {
            invalid = true
            return
        }

        onAdd(text)

        setText('')


    }



    return (

        <div >
            <div className={`${invalid ? 'invalid' : 'todo-form'}`}>
                <form className='form' onSubmit={handleSubmit}>
                    <input
                        className='todo-input'
                        type='text'
                        name='text'
                        value={text}
                        placeholder='Enter To-Do'
                        onChange={e => setText(e.target.value)}
                    />

                    {/* <DatePicker
                        wrapperClassName='date'
                        value={day}
                        placeholder="select date"
                        onChange={(date) => setDay(date)} /> */}

                    <button
                        className='add-btn'
                        type='submit'
                    >
                        <AddOutline className='add-outline'
                            height='20px' />
                    </button>

                </form>

                <ul >

                </ul>
            </div>
        </div>)
}

export default AddTodos