const { text } = require("express");
const db = require("../config/db.config")

// class Todos {
//     constructor(id, text) {
//         this.id = id
//         this.text = text
//     }

//     static getAllTodos(result) {
//         db.query('SELECT * FROM todos ORDER BY id DESC', (err, res) => {
//             if (err) {
//                 console.log(`error: ${err}`);
//                 result(null, err);
//                 return;
//             }
//             result(null, res)
//         })
//     }

//     static getById(id, result) {
//         db.query(`SELECT * FROM todos WHERE id = ?`, [id], (err, res) => {
//             if (err) {
//                 console.log(`error: ${err}`);
//                 result(err, null);
//                 return;
//             }

//             if (res.length) {
//                 console.log(`todo: ${res[0]}`);
//                 result(null, res[0]);
//                 return;
//             }

//             result({ kind: "not found" }, null);
//         });

//     }

//     static addTodo(newTodo, result) {

//         db.query(`INSERT INTO todos (text) VALUES (?)`, [newTodo.text], (err, res) => {
//             if (err) {
//                 console.log(`ERROR: ${err}`);
//                 result(err, null);
//                 return
//             }
//             result(null, {
//                 ...newTodo,
//             })
//         })

//     }

//     static deleteTodoById(id, result) {

//         db.query('DELETE FROM todos WHERE EXISTS(SELECT id = ? );', [id], (err, res) => {
//             if (err) {

//                 // console.log(`error: ${err}`);
//                 result(err, null);
//                 return
//             }
//             else result(null, { kind: 'deleted' });;
//             // console.log()
//         })
//     }
// }


// module.exports = Todos




const todos = new Map()

// let newId = 100;

// const todo = {
//     id: 100,
//     text: 'New todo',
// };

// todos.set(todo.id, todo)

function getAllTodos() {
    // return Array.from(todos.values())
    db.query('SELECT * FROM todos ORDER BY id DESC', (err, res) => {
        if (err) {
            console.log(`error: ${err}`);
            result(null, err);
            return;
        }
        todos.set(result(null, res))
    })
}

function addNewTodo(todo) {
    // newId++

    db.query(`INSERT INTO todos (text) VALUES (?)`, [newTodo.text], (err, res) => {
        if (err) {
            console.log(`ERROR: ${err}`);
            result(err, null);
            return
        }
        todos.set(result(null, {
            ...newTodo,
        }))
    })
}
//     // newId,
//     Object.assign(todo, {
//         id: newId,
//     })
// )

// })
// }

function isIdPresent(id) {

    return todos.has(id)
}

function deleteTodoById(todoId) {
    const isPresent = isIdPresent(todoId)

    if (isPresent) {
        todos.delete(todoId)
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
//         return true
//     } else {
//         return false
//     }
// }

module.exports = {
    getAllTodos,
    addNewTodo,
    deleteTodoById
}