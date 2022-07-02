const Todos = require("../../models/todos.model")


exports.getAll = (req, res) => {

    Todos.getAllTodos((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occured"
            });
        } else res.send(data);
    })
}

exports.getOneTodo = (req, res) => {

    Todos.getById(Number(req.params.id), (err, data) => {
        if (err) {
            if (err.kind === "not found") {
                res.status(404).send({
                    message: `No todo with id ${req.params.id}`
                })
            } else res.status(500).send({
                message:
                    err.message || "Some error occured"
            })
        } else res.send(data)
    })
}

exports.addTodo = (req, res) => {
    Todos.addTodo(req.body, (err, data) => {
        if (err) {
            res.status(400).json({
                "status": "failed"
            })
        } else {
            res.json({
                "status": "success",
                "data": { ...req.body }
            })
        }
    })
}

exports.deleteTodo = (req, res) => {
    Todos.deleteTodoById(Number(req.params.id), (err, data) => {
        if (err) {
            if (err.kind === 'not found') {
                res.status(404).json({
                    error: 'not found'
                })
            } else
                res.status(500).json({
                    error: "internal error"
                })
        }
        else
            res.status(200).json({
                status: 'success',
                data: null

            })



    })
}
