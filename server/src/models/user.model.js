const db = require("../config/db.config")

class Users {
    constructor(username, email, password) {
        this.id = id
        this.username = username
        this.email = email
        this.password = password


    }


    static createUser({ username, email, password }, result) {

        db.query(`INSERT INTO users (username, email, password) VALUES (?,?,?)`, [username, email, password], (err, res) => {
            if (err) {
                console.log(`ERROR: ${err}`);
                result(err, null);
                return
            }
            result(null, {
                "username": username,
                "email": email,
                "password": password,
            })
        })

    }

}

module.exports = Users