import todoList from "./todoList.js";

export default function todoListController () {
    const todoLists = {};

    const getList = () => todoLists

    const addList = (name) => {
        const newTodoList = todoList(name);
        if (!Object.keys(todoLists).includes(name)) {
            todoLists[name] = newTodoList
        }
    }

    const deleteList = (name) => {
        Reflect.deleteProperty(todoLists, name)
    }

    return {getList, addList, deleteList}
}
