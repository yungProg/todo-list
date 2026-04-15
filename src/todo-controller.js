import todoList from "./todoList.js";

export default function todoListController () {
    const todoLists = {};

    const getList = () => todoLists;

    const getLabels = () => Object.keys(todoLists)

    const addList = (name) => {
        const newTodoList = todoList(name);
        if (!Object.keys(todoLists).includes(name)) {
            todoLists[name] = newTodoList
        }
    }

    const deleteList = (name) => {
        Reflect.deleteProperty(todoLists, name)
    }

    return {getList, getLabels, addList, deleteList}
}

const tc = todoListController();
tc.addList("r");
let ee =tc.getList()["r"].createTodo({t:3})
console.log('getList:', tc.getList()["r"].getList())
