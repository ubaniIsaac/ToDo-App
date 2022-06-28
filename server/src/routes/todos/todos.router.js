const todosRouter = require('express').Router();

// const todosController = require('../todos/todos.controller');

// module.exports = app => {

//     todosRouter.get('/', todosController.getAll);

//     todosRouter.get('/:id', todosController.getOneTodo);

//     todosRouter.post('/', todosController.addTodo);

//     todosRouter.delete('/:id', todosController.deleteTodo);

//     app.use('/todo', todosRouter)

//     app.use((err, req, res, next) => {
//         res.status(err.statusCode || 500).send({
//             message: err.message
//         });
//         next();
//     })
// }


const { httpGetAllTodos, httpAddNewTodo, httpDeleteTodo } = require('./todos.controller')
module.exports = app => {


    todosRouter.get('/', httpGetAllTodos)
    todosRouter.post('/', httpAddNewTodo)
    todosRouter.delete('/:id', httpDeleteTodo)

    app.use('/todo', todosRouter)

    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
        next();
    })

}; 