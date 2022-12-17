import { useState, useEffect } from 'react';
import './Styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import AddTodos from './Components/AddTodos';
import TodoList from './Components/TodoList';
import Footer from './Components/Footer';
import CompleteList from './Components/CompleteList';
import Cookies from "universal-cookie";
const cookies = new Cookies()



function App() {
  const [todos, setTodos] = useState([])
  const [completed, setCompleted] = useState([])
  const token = cookies.get("TOKEN")


  const API_URL = 'https://todolist-web-app.onrender.com';

  let id = 100


  useEffect(() => {
    fetchTodos()
    fetchCompleted()

  }, [setCompleted])

  const login = async (email, password) => {
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

  }

  const signup = async (username, email, password) => {
    const res = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        "username": username,
        "email": email,
        "password": password
      })
    })
  }

  const fetchTodos = async () => {

    const res = await fetch(`${API_URL}/todo`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        "X-Authorization": token,
      }
    })
    const data = await res.json()

    setTodos(data)
  }

  const addTodo = async (todo) => {
    const res = await fetch(`${API_URL}/todo`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({

        "text": todo
      })
    })

    const text = await res.json()

    id++
    const newTodo = { id, ...text }

    setTodos([newTodo, ...todos])

    fetchTodos()
  }

  const completeTodo = async (id) => {

    try {
      await fetch(`${API_URL}/todo/${id}`, {
        method: 'PUT'
      });
    } catch (err) {
      console.log(err);
      return {
        ok: false
      }
    }

    setTodos(todos.filter((todo) => todo.id !== id))
  }


  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/todo/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.log(err);
      return {
        ok: false
      }
    }

    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const fetchCompleted = async () => {
    const res = await fetch(`${API_URL}/completed`, {
      method: 'GET',

    })
    const data = await res.json()

    setCompleted(data)
  }



  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignIn login={login} />} />
        <Route path='/signup' element={<SignUp signup={signup} />} />
        <Route path='/todo' element={
          <div className='container'>
            <header><h1>TO-DO LIST</h1></header>

            <AddTodos onAdd={addTodo} />
            <TodoList
              todos={todos}
              onDelete={deleteTodo}
              onComplete={completeTodo}
            />

            <Footer />

          </div>}
        />
        <Route path='/completed' element={
          <div className='container'>
            <header><h1>Completed</h1></header>


            <CompleteList
              completeTodos={completed}
              onDelete={deleteTodo}
            />


          </div>

        } />

      </Routes>
    </Router>
  );
}

export default App;
