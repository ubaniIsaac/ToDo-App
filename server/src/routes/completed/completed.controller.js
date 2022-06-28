const { getAllComplete, addNewComplete } = require('../../models/completed.model');

function httpGetAllComplete(req, res) {
    return res.status(200).json(getAllComplete());
}

function httpAddNewComplete(req, res) {
    const complete = req.body
    addNewComplete(complete)
    return res.status(200).json(complete);

}

module.exports = {
    httpGetAllComplete,
    httpAddNewComplete,

}