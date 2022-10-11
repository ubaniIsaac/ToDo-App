const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Users = require("../../models/user.model")
const db = require("../../config/db.config")

const SECRET_KEY = "mkjkdjjfsijlhjvjflfkjuiojhfidufkldufhdilfjkdjfiljdifjidjfiljiofiikdjfk"

exports.signup = (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({ err: "Content cannot be empty" })
        }
        else {
            db.query(`SELECT * FROM users WHERE email = ?`, [email], async (err, result) => {
                if (result[0]) return res.status(400).json({ error: "Email has already been used" })
                else {
                    const hashPassword = await bcrypt.hash(password, 10);
                    const user = Users.createUser({ username: username, email: email, password: hashPassword }, (err, data) => {
                        if (err) {
                            return res.status(500).json({
                                error: err.message || "Some error occured"
                            })
                        }
                        else {
                            const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "24h" })
                            return res.json({ status: "success", data: user, token })
                        }
                    })
                }


            })
        }
    } catch (error) {
        throw error
    }

}

exports.login = (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("All inputs required");
        }
        db.query(`SELECT * FROM users WHERE email = ?`, [email], async (err, result) => {
            // console.log(result[0].password)
            if (result && (await bcrypt.compare(password, result[0].password))) {
                const token = jwt.sign({ id: result[0].id, email }, SECRET_KEY, { expiresIn: "24h" })
                return res.status(200).json({ data: result, token })
            } else {
                res.status(400).send("Invalid Credentials");
            }
        })
    } catch (error) {
        throw error
    }

}