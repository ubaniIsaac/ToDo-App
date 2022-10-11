const db = require("../config/db.config")

class Todos {
    constructor(id, text) {
        this.id = id
        this.text = text
    }

    static getAllTodos(result) {
        db.query('SELECT * FROM todos WHERE completed = 0 ORDER BY id DESC', (err, res) => {
            if (err) {
                console.log(`error: ${err}`);
                result(null, err);
                return;
            }
            result(null, res)
        })
    }

    static getCompletedTodos(result) {
        db.query(`SELECT * FROM todos WHERE completed = 1 ORDER BY id DESC`, (err, res) => {
            if (err) {
                console.log(`error: ${err}`);
                result(null, err);
                return;
            }
            result(null, res)
        })
    }

    static getById(id, result) {
        db.query(`SELECT * FROM todos WHERE id = ?`, [id], (err, res) => {
            if (err) {
                console.log(`error: ${err}`);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log(`todo: ${res[0]}`);
                result(null, res[0]);
                return;
            }

            result({ kind: "not found" }, null);
        });

    }

    static addTodo(newTodo, result) {

        db.query(`INSERT INTO todos (text) VALUES (?)`, [newTodo.text], (err, res) => {
            if (err) {
                console.log(`ERROR: ${err}`);
                result(err, null);
                return
            }
            result(null, {
                ...newTodo,
            })
        })

    }

    static completeTodoById(id, result) {
        db.query('SELECT * FROM todos WHERE id = ?', [id], (err, res) => {
            if (err) {
                result({ kind: err }, null)
                return
            }
            db.query('UPDATE todos SET completed = 1 WHERE id = ?', [id], (err, res) => {
                if (err) {
                    throw err
                }
                result(null, { Todos })
            })
        })
    }

    static deleteTodoById(id, result) {
        db.query('SELECT * FROM todos WHERE id = ?', [id], (err, res) => {
            if (!res[0]) {
                result({ kind: 'not found' }, null)
                return
            }
            db.query('DELETE FROM todos WHERE id = ?', [id], (err, res) => {
                if (err) {

                    // console.log(`error: ${err}`);
                    result(err, null);
                    return
                }
                else result(null, { kind: 'deleted' });;
                // console.log()
            })


        })

    }
}


module.exports = Todos
