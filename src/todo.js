export default function todo (title, dueDate, priority, description) {
    const task = {
        id: crypto.randomUUID(),
        status: false,
        title: title,
        dueDate: dueDate,
        priority: priority,
        description: description,
        category: "general",
        updateProperty: function(property, newValue) {this[property] = newValue}
    };
    
    const getTask = () => task

    return {getTask}
}