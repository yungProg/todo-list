import todo from "./src/todo.js";

export default function todos () {
    const tasks = [{
        id: crypto.randomUUID(),
        title: "In development",
        dueDate: "06-04-2026",
        priority: "high",
        description: "complete this project and push to production before tuesday",
        updateProperty: function(property, newValue) {this[property] = newValue},
        category: "general"
    }];

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