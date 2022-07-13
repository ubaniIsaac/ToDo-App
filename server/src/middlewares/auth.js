const jwt = require("jsonwebtoken")

const SECRET_KEY = "mkjkdjjfsijlhjvjflfkjuiojhfidufkldufhdilfjkdjfiljdifjidjfiljiofiikdjfk"

module.exports = async (req, res, next) => {
    try {
        const token = await req.body.token || req.query.token || req.headers["x-access-token"];

        if (!token) {
            return res.status(403).send("A token is require")
        }
        const decoded = await jwt.verify(token, SECRET_KEY)
        req.user = decoded
    } catch (err) {
        return res.status(401).send("Invalid token")
    }

    return next()
}