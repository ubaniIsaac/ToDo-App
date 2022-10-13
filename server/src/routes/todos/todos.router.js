const todosRouter = require('express').Router();

const auth = require('../../middlewares/auth');
const todosController = require('./todos.controller');

module.exports = app => {

    todosRouter.get('/todo', auth, todosController.getAll);

    todosRouter.get('/todo/:id', todosController.getOneTodo);

    todosRouter.get('/completed', todosController.getCompletedTodos);

    todosRouter.put('/todo/:id', todosController.completeTodo);

    todosRouter.post('/todo', todosController.addTodo);

    todosRouter.delete('/todo/:id', todosController.deleteTodo);

    app.use('/', todosRouter)

    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
        next();
    })
}
