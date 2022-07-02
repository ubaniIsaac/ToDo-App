const { text } = require("express");
const db = require("../config/db.config")

class Todos {
    constructor(id, text) {
        this.id = id
        this.text = text
    }

    static getAllTodos(result) {
        db.query('SELECT * FROM todos ORDER BY id DESC', (err, res) => {
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

    static deleteTodoById(id, result) {

        db.query('DELETE FROM todos WHERE EXISTS(SELECT id = ? );', [id], (err, res) => {
            if (err) {

                // console.log(`error: ${err}`);
                result(err, null);
                return
            }
            else result(null, { kind: 'deleted' });;
            // console.log()
        })
    }
}


module.exports = Todos
