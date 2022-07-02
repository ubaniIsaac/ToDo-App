const completedRouter = require('express').Router();

const completedController = require('../completed/completed.controller');

module.exports = app => {

    completedRouter.get('/', completedController.getAll);

    completedRouter.get('/:id', completedController.getOneComplete);

    completedRouter.post('/', completedController.addCompleted);

    completedRouter.delete('/:id', completedController.deleteComplete);

    app.use('/completed', completedRouter)

    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
        next();
    })
}
