const addedTasks: string[] = []; // Array to store added tasks

document.getElementById("addButton")?.addEventListener("click", function () {
    const taskInput = document.getElementById("taskInput") as HTMLInputElement;
    const todoList = document.getElementById("todoList") as HTMLDivElement;
    const taskText = taskInput.value.trim();



    if ((addedTasks.includes(taskText.toLowerCase()))){

        alert("Task already exists!");

        return;

    }



    addedTasks.push(taskText.toLowerCase());
          

        const todoItem = document.createElement("div");
        todoItem.className = "todo-item";

        const taskElement = document.createElement("span");
        taskElement.className = "task";
        taskElement.textContent = taskText;

        todoItem.appendChild(taskElement);

        const statusDropdown = document.createElement("select");
        statusDropdown.className = "form-select status-dropdown";
        statusDropdown.innerHTML = `
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
        `;

        const checkboxContainer = document.createElement("div");
        checkboxContainer.className = "status-checkbox";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.disabled = true;

        checkboxContainer.appendChild(checkbox);
        statusDropdown.addEventListener("change", function () {
            checkbox.checked = this.value === "completed";
        });



        function isCompletedSelected() {

            const statusDropdown = document.querySelector(".form-select status-dropdown") as HTMLSelectElement;
          
            return statusDropdown.value === "Completed";
          
          }

        const deleteButton = document.createElement("span");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "❌";
        deleteButton.addEventListener("click", function () {
            todoList.removeChild(todoItem);
            const index = addedTasks.indexOf(taskText.toLowerCase());
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

(document.getElementById("searchInput") as HTMLInputElement)?.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const todoItems = document.querySelectorAll(".todo-item");

    todoItems.forEach(item => {
        const taskText = (item.querySelector(".task") as HTMLElement)?.textContent?.toLowerCase() || "";
        if (taskText.includes(searchTerm)) {
            (item as HTMLDivElement).style.display = "flex";
        } else {
            (item as HTMLDivElement).style.display = "none";
        }
    });
});

function updateTaskStatus(taskElement: HTMLElement, checkbox: HTMLInputElement, status: string) {
    if (status === "completed") {
        taskElement.classList.add("completed-task");
        checkbox.checked = true;
    } else {
        taskElement.classList.remove("completed-task");
        checkbox.checked = false;
    }
}

// Attach change event to status dropdown
document.addEventListener("change", function (event) {
    if ((event.target as HTMLElement).classList.contains("status-dropdown")) {
        const taskItem = (event.target as HTMLElement).closest(".todo-item");
        const taskElement = taskItem?.querySelector(".task") as HTMLElement;
        const checkbox = taskItem?.querySelector("input[type='checkbox']") as HTMLInputElement;
        updateTaskStatus(taskElement, checkbox, (event.target as HTMLSelectElement).value);
    }
});
