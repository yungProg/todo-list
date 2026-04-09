import todo from "./todo.js";

export default function list (listName) {
    listName = [];

    const getList = () => listName;

    const getAllTodos = () => {
        return listName.map(t => t.getTask())
    }

    const createTodo = (title, startDate, priority, description, category) => {
        const task = todo(title, startDate, priority, description, category);
        listName.push(task)
    }

    const deleteTodo = (id) => {
        listName.forEach((task, index)=> {
            if (task.getId() == id) {
                listName.splice(index, 1)
            }
        })
    }

    return {getList, createTodo, deleteTodo, getAllTodos}
}
