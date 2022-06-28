const completed = new Map()

let newId = 100;

const complete = {
    id: 100,
    text: 'something'

}

completed.set(complete.id, complete)

function getAllComplete() {
    return Array.from(completed.values())
}


function addNewComplete(complete) {
    newId++
    completed.set(
        Object.assign(complete, {

        })
    )
    console.log(complete);
}

module.exports = {
    getAllComplete,
    addNewComplete
}