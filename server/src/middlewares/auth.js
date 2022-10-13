const jwt = require("jsonwebtoken")
require("dotenv").config()
const { SECRET_KEY } = process.env


module.exports = async (req, res, next) => {
    const token = await req.header("x-authorization") || req.query.token || req.header("x-access-token");
    try {

        if (!token) {
            return res.status(403).send("A token is required")
        }
        const decoded = jwt.verify(token, SECRET_KEY)
        req.user = decoded.user

    } catch (err) {
        return res.status(401).send("Invalid token")
    }

    return next()
}