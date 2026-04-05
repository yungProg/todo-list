export default function todo (title, dueDate, priority, description) {
    const task = {
        id: crypto.randomUUID(),
        title: title,
        dueDate: dueDate,
        priority: priority,
        description: description,
        updateProperty: function(property, newValue) {this[property] = newValue},
        category: "general"
    };
    
    const getTask = () => task

    return {getTask}
}