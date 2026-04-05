import todo from "./src/todo.js";

export default function todos () {
    const tasks = [];

    const getTasks = () => tasks

    const createTask = (title, dueDate, priority, description) => {
        const activity = todo(title, dueDate, priority, description);

        return activity.getTask()
    }

    const addTask = (title, dueDate, priority, description) => {
        if (isExceedThreshold(title, 50)) return

        const activity = createTask(title, dueDate, priority, description)
        tasks.push(activity)
    }

    const isExceedThreshold = (title, threshold) => title.length > threshold ? true : false 

    const deleteTask = (taskId) => {
        tasks.forEach((task, index) => {
            if (task.id == taskId) {
                tasks.splice(index, 1);
                return
            }
        })
    }

    const filterByCategory = (category) => {
        const categorizedTasks = tasks.filter(task => task.category == category);

        return categorizedTasks
    }

    return {getTasks, addTask, deleteTask, filterByCategory}
}