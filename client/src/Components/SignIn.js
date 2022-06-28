import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/SignIn.css'

const SignIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    // const
    const onSubmit = (e) => {
        e.preventDefault()

        if (email
            && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            &&
            password) {
            navigate('/todo')
            // <Link to='/Todo'></Link>
        } else {
            alert('Insert Email & Password')
        }
    }

    return (
        <div>
            <header className="form-header">
                <h1>Sign in with your Email.</h1>
                <h6>Don't have an account? <span>Sign Up.</span></h6>
            </header>
            <form onSubmit={onSubmit}>
                {/* <label className="label">Name</label>
                <input className="name" type="text" /> */}
                <label className="label">Email </label>

                <input className="email signin"
                    type="email"
                    placeholder='Email'
                    value={email}
                    onChange={
                        (e) => setEmail(e.target.value)
                    }
                />
                <label className="label">Password </label>
                <input className="password signin"
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={
                        (e) => setPassword(e.target.value)
                    } />

                <button className='btn' type='submit'>SIGN IN</button>

            </form>
        </div>
    )
}

export default SignIn