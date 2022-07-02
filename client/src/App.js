import { useState, useEffect } from 'react';
import './Styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignIn from './Components/SignIn';
import AddTodos from './Components/AddTodos';
import Todo from './Components/Todo';
import TodoList from './Components/TodoList';
import { v4 as uuidv4 } from 'uuid';
import Footer from './Components/Footer';
import Completed from './Components/Completed';



function App() {
  const [todos, setTodos] = useState([])
  const [complete, setComplete] = useState([])


  const API_URL = 'http://localhost:5000';

  let id = 100

  useEffect(() => {
    fetchTodos()
    fetchCompleted()

  }, [])

  const fetchTodos = async () => {
    const res = await fetch(`${API_URL}/todo`)
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
    const res = await fetch(`${API_URL}/completed`)
    const data = await res.json()

    setComplete(data)
  }


  const completeTodo = async (completes, id) => {

    console.log(completes);
    const res = await fetch(`${API_URL}/completed`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        "text": completes

      })
    })

    const text = await res.json()

    const newComplete = { id, ...text }

    console.log(newComplete)

    setComplete([newComplete, ...complete])

    fetchCompleted()
    console.log(complete)
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/todo' element={
          <>
            <AddTodos onAdd={addTodo} />

            <TodoList
              todos={todos}
              onDelete={deleteTodo}
              onComplete={completeTodo}
            />

            <Footer />

          </>} />
        <Route path='/completed' element={<Completed
          todos={todos}

        />} />

      </Routes>
    </Router>
  );
}

export default App;
