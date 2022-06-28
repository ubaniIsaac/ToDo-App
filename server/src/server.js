const express = require('express')
const cors = require('cors')


// const { todosRouter } = require('./routes/todos/todos.router')
// const { completedRouter } = require('./routes/completed/completed.router')
const app = express()


app.use(cors({
    origin: 'http://localhost:3000',
}));


const PORT = process.env.PORT || 5000;


app.use(express.json());


app.get('/', (req, res) => {
    res.json({ message: 'Todo List Application' })
});

require('./routes/todos/todos.router')(app);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})