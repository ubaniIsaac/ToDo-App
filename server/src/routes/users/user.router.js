const userRouter = require('express').Router();

const userController = require("./user.controller")

module.exports = app => {

    userRouter.post('/signup', userController.signup);

    userRouter.post('/', userController.login);

    app.use('/', userRouter)

    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
        next();
    })
}
