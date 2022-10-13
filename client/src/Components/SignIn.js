import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/SignIn.css'
import Cookies from "universal-cookie";
const cookies = new Cookies()

const API_URL = 'http://localhost:5000'

const SignIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(false)
    const [loginResponse, setLoginResponse] = useState('')
    const navigate = useNavigate()

    const login = async (email, password) => {
        try {
            const res = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({

                    "email": email,
                    "password": password
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    cookies.set("TOKEN", data['token'], {
                        path: "/",
                    })
                    if (!data.token) {
                        setSuccess(false)
                        setLoginResponse(data.message)

                    }
                    else {
                        setSuccess(true)
                        window.location.href = "/todo"
                    }
                })
        } catch (error) {
            new Error();
        }


    }
    // const
    const onSubmit = (e) => {
        e.preventDefault()

        if (email
            && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            &&
            password) {
            login(email, password)
            // navigate('/todo')
            // <Link to='/Todo'></Link>
        } else {
            setLoginResponse('Insert Email & Password')
        }



    }

    return (
        <div>
            <header className="form-header">
                <h1>Sign in with your Email.</h1>
                <h6>Don't have an account? <span><a href='/signup'>SignUp</a></span></h6>
            </header>
            <form onSubmit={onSubmit}>
                {/* <label className="label">Name</label>
                <input className="name" type="text" /> */}
                <label className="label">Email </label>

                <input className="email signin"
                    name='email'
                    type="email"
                    placeholder='Email'
                    value={email}
                    onChange={
                        (e) => setEmail(e.target.value)
                    }
                />
                <label className="label">Password </label>
                <input className="password signin"
                    name='password'
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={
                        (e) => setPassword(e.target.value)
                    } />

                <button className='btn' type='submit'>SIGN IN</button>

            </form>
            {success === false ? <p>{loginResponse}</p> : <></>}
        </div>
    )
}

export default SignIn