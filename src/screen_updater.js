import todos from "../todos.js";

export default function screenUpdater () {
    const userTodos = todos();
    const todosArray = userTodos.getTasks()
    const mainContainer = document.querySelector(".main-container");

    const renderTodos = () => {
        // clear container
        mainContainer.textContent = "";

        //iterate and display each todo;
        todosArray.forEach(todo => {
            const todoDiv = todoTemplate(todo.id, todo.title, todo.dueDate, todo.description, todo.priority)
            mainContainer.appendChild(todoDiv);
            console.log(todo);
        })
    }

    const todoTemplate = (id, title, dueDate, description, priority, category) => {
        const todoContainer = document.createElement("div");
        todoContainer.classList.add("todo");
        todoContainer.dataset.id = id;
        const todoTitle = document.createElement("h3");
        todoTitle.textContent = title;
        todoTitle.classList.add("title");
        const todoDueDate = document.createElement("span");
        todoDueDate.textContent = dueDate;
        const todoDescription = document.createElement("p");
        todoDescription.textContent = description;
        todoDescription.classList.add("description");
        const todoPriority = document.createElement("span");
        todoPriority.textContent = priority;
        todoPriority.classList.add("priority");
        const todoCategory = document.createElement("span");
        todoCategory.textContent = category;
        todoCategory.classList.add("category");

        // functionality buttons
        const editBtn = document.createElement("button");
        editBtn.setAttribute("type", "button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");
        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("type", "button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        const toggleComplete = document.createElement("input");
        toggleComplete.setAttribute("type", "checkbox");
        toggleComplete.classList.add("toggle-complete")

        // append children
        todoContainer.appendChild(toggleComplete);
        todoContainer.appendChild(todoTitle);
        todoContainer.appendChild(todoDescription);
        todoContainer.appendChild(todoPriority);
        todoContainer.appendChild(todoDueDate);
        todoContainer.appendChild(todoCategory);
        todoContainer.appendChild(editBtn);
        todoContainer.appendChild(deleteBtn);


        return todoContainer
    }

    return {renderTodos}
}