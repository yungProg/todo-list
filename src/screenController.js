import todoListController from "./todo-controller.js";
import ScreenUpdater from "./screenUpdater.js";

export default function screenController () {
    const appController = todoListController();
    let activeList

    const htmlEls = {
        labelsDiv: document.querySelector(".lists-div"),
        todosDiv: document.querySelector(".content"),
        newListBtn: document.querySelector(".new-list-btn"),
        newListDialog: document.querySelector(".new-list-dialog"),
        newListForm: document.querySelector(".new-list-form"),
        newTodoBtn: document.querySelector(".new-todo-btn"),
        newTodoDialog: document.querySelector(".new-todo-dialog"),
        newTodoForm: document.querySelector(".new-todo-form"),
        editTodoDialog: document.querySelector(".edit-todo-dialog"),
        updateTodoForm: document.querySelector(".edit-todo-form"),
        cancelBtns: document.querySelectorAll(".cancel-btn"),
    }

    const toggleNewTodoBtn = () => activeList ? htmlEls.newTodoBtn.removeAttribute("disabled") : htmlEls.newListBtn.setAttribute("disabled", true)
    
    const addNewList = (e) => {
        e.preventDefault()
        let nameInput = document.getElementById("list-label").value;
        nameInput = nameInput.trim()
        appController.addList(nameInput)
        const labels = appController.getLabels();
        activeList = nameInput
        toggleNewTodoBtn();
        ScreenUpdater.renderLabels(labels, htmlEls.labelsDiv);
        document.querySelector(".content").textContent = ""
        renderTodoList(activeList);
    }

    const renderTodoList = (listName) => {
        listName = listName.trim()
        const listsName = appController.getList()[listName];
        if (!listsName) {
            return
        }
        activeList = listName;
        const contentDiv = document.querySelector(".content");
        listsName.getList().forEach(todo => {
            const task = ScreenUpdater.renderTodo(todo.id, todo.status, todo.title, todo.description, todo.startDate, todo.priority, () => deleteFunction(todo.id), () => updateFormRenderer(todo.id))
            contentDiv.appendChild(task)
        })
    }

    const renderAllTodos = () => {
        let labels = appController.getLabels();
        let currentName = activeList
        labels.forEach(item => {
            console.log(item);
            const r = renderTodoList(item)
            console.log(r);
            
        });
        activeList = currentName
    }

    (() => {
        appController.addList("All Todos")
        const labels = appController.getLabels();
        activeList = "All Todos"
        ScreenUpdater.renderLabels(labels, htmlEls.labelsDiv);
        document.querySelector(".label").classList.add("all-todos")
        labels.forEach(item => renderTodoList(item))
    })()

    const updateFormRenderer = (id) => {
        htmlEls.editTodoDialog.showModal();
        const todo = appController.getList()[activeList].findTodo(id)
        ScreenUpdater.renderUpdater(id, todo.title, todo.description, todo.startDate, todo.priority)
    }

    function deleteFunction (id) {
        appController.getList()[activeList].deleteTodo(id);
        document.querySelector(".content").textContent = "";
        appController.getList()[activeList].getList().forEach(todo => {
            const task = ScreenUpdater.renderTodo(todo.id, todo.status, todo.title, todo.description, todo.startDate, todo.priority, () => deleteFunction(todo.id), () => updateFormRenderer(todo.id))
            document.querySelector(".content").appendChild(task)
        })
    }


    const updateTodo = (e, id) => {
        id = id || e.target.dataset.id;
        
        e.preventDefault()
        const newValues = {
            title: document.getElementById("title-edit").value,
            description: document.getElementById("description-edit").value,
            startDate: document.getElementById("start-date-edit").value,
            priority: document.getElementById("priority-edit").value
        }

        document.querySelector(".content").textContent = "";
        appController.getList()[activeList].updateTodo(id, newValues);
        appController.getList()[activeList].getList().forEach(todo => {
            const task = ScreenUpdater.renderTodo(todo.id, todo.status, todo.title, todo.description, todo.startDate, todo.priority, () => deleteFunction(todo.id), () => updateFormRenderer(todo.id))
            document.querySelector(".content").appendChild(task)
        })
        ScreenUpdater.closeElement(htmlEls.editTodoDialog, htmlEls.updateTodoForm);
    }


    const addNewTodo = (e) => {
        e.preventDefault();
        const titleInput = document.getElementById("title-input").value;
        const descriptionInput = document.getElementById("description-input").value;
        const startDateInput = document.getElementById("start-date-input").value;
        const prioritySelect = document.getElementById("priority-select").value;

        const todoCreate = appController.getList()[activeList].createTodo({title: titleInput, description: descriptionInput, startDate: startDateInput, priority: prioritySelect})
        const todoId = todoCreate.id;
        const todoElement = ScreenUpdater.renderTodo(todoId, false, titleInput, descriptionInput, startDateInput, prioritySelect, () => deleteFunction(todoId), () => updateFormRenderer(todoId))
        htmlEls.todosDiv.appendChild(todoElement);
        ScreenUpdater.closeElement(htmlEls.newTodoDialog, htmlEls.newTodoForm);
    }

    htmlEls.labelsDiv.addEventListener("click", (e) => {
        const contentDiv = document.querySelector(".content");
        contentDiv.textContent = "";
        if (e.target.dataset.listName == "All Todos") {
            renderAllTodos()
        } else {
            renderTodoList(e.target.dataset.listName);
        }        
    })
    htmlEls.newListBtn.addEventListener("click", () => htmlEls.newListDialog.showModal())
    htmlEls.cancelBtns.forEach(el => el.addEventListener("click", () => ScreenUpdater.closeElement(htmlEls.newListDialog, htmlEls.newListForm)))
    htmlEls.newListForm.addEventListener("submit", (e) => {
        addNewList(e)
        ScreenUpdater.closeElement(htmlEls.newListDialog, htmlEls.newListForm)
    })
    htmlEls.newTodoForm.addEventListener("submit", addNewTodo);
    htmlEls.updateTodoForm.addEventListener("submit", updateTodo);
    htmlEls.newTodoBtn.addEventListener("click", () => ScreenUpdater.renderDialog(htmlEls.newTodoDialog))
}