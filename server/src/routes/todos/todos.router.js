const todosRouter = require('express').Router();

const todosController = require('../todos/todos.controller');

module.exports = app => {

    todosRouter.get('/', todosController.getAll);

    todosRouter.get('/:id', todosController.getOneTodo);

    todosRouter.post('/', todosController.addTodo);

    todosRouter.delete('/:id', todosController.deleteTodo);

    app.use('/todo', todosRouter)

    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
        next();
    })
}
