const db = require("../config/db.config")

class Completed {
    constructor(id, text) {
        this.id = id
        this.text = text
    }

    static getAllComplete(result) {
        db.query('SELECT * FROM completed ORDER BY id DESC', (err, res) => {
            if (err) {
                console.log(`error: ${err}`);
                result(null, err);
                return;
            }
            result(null, res)
        })
    }

    static getCompleteById(id, result) {
        db.query(`SELECT * FROM completed WHERE id = ?`, [id], (err, res) => {
            if (err) {
                console.log(`error: ${err}`);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log(`completed: ${res[0]}`);
                result(null, res[0]);
                return;
            }

            result({ kind: "not found" }, null);
        });

    }

    static addCompleted(completed, result) {

        db.query(`INSERT INTO completed (text) VALUES (?)`, [completed.text], (err, res) => {
            if (err) {
                console.log(`ERROR: ${err}`);
                result(err, null);
                return
            }
            result(null, {
                ...completed,
            })
        })

    }

    static deleteCompleteById(id, result) {
        try {
            const completed = db.query('`SELECT * FROM completed WHERE id = ?`', [id])
            if (!completed) {
                throw error
            }
            db.query('DELETE FROM completed WHERE EXISTS(SELECT id = ? );', [id], (err, res) => {
                result(null, { kind: 'deleted' });;
                // console.log()wws
            })
        } catch (error) {
            result(err, null);
            return

        }

    }

}

module.exports = Completed
