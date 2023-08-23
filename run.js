var _a, _b;
var addedTasks = []; // Array to store added tasks
(_a = document.getElementById("addButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    var taskInput = document.getElementById("taskInput");
    var todoList = document.getElementById("todoList");
    var taskText = taskInput.value.trim();
    if ((addedTasks.includes(taskText.toLowerCase())) && isCompletedSelected()) {
        alert("Task already exists!");
        return;
    }
    addedTasks.push(taskText.toLowerCase());
    var todoItem = document.createElement("div");
    todoItem.className = "todo-item";
    var taskElement = document.createElement("span");
    taskElement.className = "task";
    taskElement.textContent = taskText;
    todoItem.appendChild(taskElement);
    var statusDropdown = document.createElement("select");
    statusDropdown.className = "form-select status-dropdown";
    statusDropdown.innerHTML = "\n            <option value=\"pending\">Pending</option>\n            <option value=\"completed\">Completed</option>\n        ";
    var checkboxContainer = document.createElement("div");
    checkboxContainer.className = "status-checkbox";
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.disabled = true;
    checkboxContainer.appendChild(checkbox);
    statusDropdown.addEventListener("change", function () {
        checkbox.checked = this.value === "completed";
    });
    function isCompletedSelected() {
        var statusDropdown = document.querySelector(".form-select status-dropdown");
        return statusDropdown.value === "Completed";
    }
    var deleteButton = document.createElement("span");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "❌";
    deleteButton.addEventListener("click", function () {
        todoList.removeChild(todoItem);
        var index = addedTasks.indexOf(taskText.toLowerCase());
        if (index !== -1) {
            addedTasks.splice(index, 1);
        }
    });
    todoItem.appendChild(taskElement);
    todoItem.appendChild(statusDropdown);
    todoItem.appendChild(checkboxContainer);
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
    taskInput.value = "";
});
(_b = document.getElementById("searchInput")) === null || _b === void 0 ? void 0 : _b.addEventListener("input", function () {
    var searchTerm = this.value.toLowerCase();
    var todoItems = document.querySelectorAll(".todo-item");
    todoItems.forEach(function (item) {
        var _a, _b;
        var taskText = ((_b = (_a = item.querySelector(".task")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || "";
        if (taskText.includes(searchTerm)) {
            item.style.display = "flex";
        }
        else {
            item.style.display = "none";
        }
    });
});
function updateTaskStatus(taskElement, checkbox, status) {
    if (status === "completed") {
        taskElement.classList.add("completed-task");
        checkbox.checked = true;
    }
    else {
        taskElement.classList.remove("completed-task");
        checkbox.checked = false;
    }
}
// Attach change event to status dropdown
document.addEventListener("change", function (event) {
    if (event.target.classList.contains("status-dropdown")) {
        var taskItem = event.target.closest(".todo-item");
        var taskElement = taskItem === null || taskItem === void 0 ? void 0 : taskItem.querySelector(".task");
        var checkbox = taskItem === null || taskItem === void 0 ? void 0 : taskItem.querySelector("input[type='checkbox']");
        updateTaskStatus(taskElement, checkbox, event.target.value);
    }
});
