class TodoApp {
  constructor(inputId, listId, buttonId) {
    this.input = document.getElementById(inputId);
    this.list = document.getElementById(listId);
    this.addBtn = document.getElementById(buttonId);

    // Load saved tasks
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    this.addBtn.addEventListener("click", () => this.addTask());

    this.renderTasks(); // show saved tasks
  }

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  addTask() {
    const taskText = this.input.value.trim();

    if (taskText === "") {
      alert("Enter a task");
      return;
    }

    this.tasks.push(taskText);
    this.saveTasks();
    this.renderTasks();

    this.input.value = "";
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.saveTasks();
    this.renderTasks();
  }

  editTask(index) {
    const newTask = prompt("Edit task:", this.tasks[index]);

    if (newTask !== null && newTask.trim() !== "") {
      this.tasks[index] = newTask;
      this.saveTasks();
      this.renderTasks();
    }
  }

  renderTasks() {
    this.list.innerHTML = "";

    this.tasks.forEach((task, index) => {
      const li = document.createElement("li");

      const span = document.createElement("span");
      span.textContent = task;

      const actions = document.createElement("div");

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "edit-btn";
      editBtn.onclick = () => this.editTask(index);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = () => this.deleteTask(index);

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      li.appendChild(span);
      li.appendChild(actions);

      this.list.appendChild(li);
    });
  }
}

const app = new TodoApp("taskInput", "taskList", "addBtn");
