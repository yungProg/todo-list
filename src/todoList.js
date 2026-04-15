import todo from "./todo.js";

export default function todoList (listName) {
    listName = listName.trim();
    const list = []

    const getList = () => list;

    const getListName = () => listName;

    const createTodo = (todoObj) => {
        const newTodo = todo(todoObj)
        list.push(newTodo)
        return newTodo;
    }

    const findTodo = (id) => {
        for (const task of list) {
            if (task.id == id) {
                return task
            }
        }
    }

    const updateTodo = (id, newValues) => {
        let index = 0;
        for (const todo of list) {
            console.log('todo:', todo)
                            console.log('id:', id)

            if (todo.id == id) {
                console.log('before', list[index])
                list[index] = {...todo, ...newValues}
                console.log('after', list[index])
                return
            }
            index += 1
        }
        console.log(false);
        
    }

    const deleteTodo = (id) => {
        let index = 0
        for (const todo of list) {
            if (todo.id == id) {
                list.splice(index, 1);
                console.log('list:', list)
                return
            }
            index += 1
        }
        console.log(false);
    }

    return {findTodo, getList, getListName, createTodo, updateTodo, deleteTodo}
}

const d = todoList("h")
d.createTodo({t:7})
let js = JSON.stringify(d.getList())
console.log(js, JSON.parse(js));
