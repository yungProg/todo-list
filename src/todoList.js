import todo from "./todo.js";

export default function todoList (listName) {
    listName = listName.trim();
    const list = []

    const getList = () => list;

    const getListName = () => listName;

    const createTodo = (todoObj) => {
        const newTodo = todo(todoObj)
        list.push(newTodo)
    }

    const updateTodo = (id, newValues) => {
        let index = 0;
        for (const todo of list) {
            if (todo.id == id) {
                list[index] = {...todo, ...newValues}
                return
            }
            index += 1
        }
    }

    const deleteTodo = (id) => {
        let index = 0
        for (const todo of list) {
            if (todo.id == id) {
                list.splice(index, 1);
                return
            }
            index += 1
        }
    }

    return {getList, getListName, createTodo, updateTodo, deleteTodo}
}
