const todosRouter = require('express').Router();

const auth = require('../../middlewares/auth');
const todosController = require('./todos.controller');

module.exports = app => {

    todosRouter.get('/', auth, todosController.getAll);

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
