export default class ScreenUpdater {
    static renderLabels = (labelsArr, targetDiv) => {
        targetDiv.textContent = "";
        labelsArr.forEach(label => {
            const labelBtn = document.createElement("button");
            labelBtn.setAttribute("type", "button");
            labelBtn.classList.add("label");
            labelBtn.dataset.listName = label;
            labelBtn.textContent = label;
            targetDiv.appendChild(labelBtn)
        })
    }

    static clearField = (field) => field.textContent = "";

    static renderTodo = (id, status, title, description, startDate, priority, deleteFunction, updateRenderer) => {
        const todoTemplate = document.querySelector(".todo-template");
        const clone = document.importNode(todoTemplate.content, true);
        const bgColors = {
            High: "#e08b8b",
            Medium: "#e2d1a8",
            Low: "#9dc0e1"
        }

        clone.querySelector(".todo").dataset.id  = id;
        clone.querySelector(".status-box").checked = status;
        clone.querySelector(".title").textContent = title;
        clone.querySelector(".description").textContent = description;
        clone.querySelector(".start-date").textContent = startDate || Date();
        clone.querySelector(".priority").textContent = priority;
        clone.querySelector(".todo").style.backgroundColor = bgColors[priority]

        clone.querySelector(".delete-btn").addEventListener("click", deleteFunction);
        clone.querySelector(".edit-btn").addEventListener("click", updateRenderer);

        return clone
    }

    static renderUpdater = (id, title, description, startDate, priority) => {
        document.querySelector(".edit-todo-form").dataset.id = id
        document.getElementById("title-edit").value = title;
        document.getElementById("description-edit").value = description;
        document.getElementById("start-date-edit").value = startDate;
        document.getElementById("priority-edit").value = priority;
    }

    static renderDialog = (targetDialog) => {
        targetDialog.showModal()
    }

    static closeElement = (targetElement, formElement) => {
        targetElement.close();
        formElement.reset();
    }
}