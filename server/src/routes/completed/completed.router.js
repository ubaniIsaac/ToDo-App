const express = require('express')

const { httpGetAllComplete, httpAddNewComplete } = require('./completed.controller');

const completedRouter = express.Router();

completedRouter.get('/', httpGetAllComplete)
completedRouter.post('/', httpAddNewComplete)

module.exports = { completedRouter }