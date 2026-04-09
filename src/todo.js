export default function todo (title, startDate, priority, description, category) {
    const task = {
        id: crypto.randomUUID(),
        status: false,
        title: title,
        startDate: startDate,
        priority: priority,
        description: description,
        category: category,
    };
    
    const getTask = () => task

    const updateTodo = (newValues) => {
        Object.assign(task, newValues)
    }

    const getId = () => getTask().id

    return {getTask, updateTodo, getId}
}