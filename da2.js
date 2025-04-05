const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const filters = document.querySelectorAll("#filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("task-title").value;
  const date = document.getElementById("task-date").value;
  const task = { id: Date.now(), title, date, completed: false };
  tasks.push(task);
  saveAndRender();
  form.reset();
});

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks(filter = "all") {
  taskList.innerHTML = "";
  tasks
    .filter(task => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .forEach(task => {
      const li = document.createElement("li");
      li.className = "task" + (task.completed ? " completed" : "");
      li.innerHTML = `
        <span>${task.title} - ${task.date}</span>
        <div>
          <button onclick="toggleTask(${task.id})">${task.completed ? "Undo" : "Done"}</button>
          <button onclick="deleteTask(${task.id})">Delete</button>
        </div>`;
      taskList.appendChild(li);
    });
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveAndRender();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveAndRender();
}

filters.forEach(btn => {
  btn.addEventListener("click", () => renderTasks(btn.dataset.filter));
});

renderTasks();