console.log("Hí chào cậu nhé!");

//Đặt tên biến theo các class hiện có trong file HTML bằng querySelector
const taskInput = document.querySelector(".input-section input");
const addButton = document.querySelector(".btn-app");
const taskList = document.querySelector(".task-board");
const filterButton = document.querySelectorAll(".filter-tabs .tab");
const summary = document.querySelector(".footer-status");

addButton.addEventListener("click", function () {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    taskInput.classList.add("error");
    return;
  } else {
    taskInput.classList.remove("error");
  }

  const taskItem = document.createElement("div");
  taskItem.className = "task-item";
  taskItem.innerHTML = `
    <label class="task-label">
      <input type="checkbox" />
      <span class="custom-checkbox"></span>
      <span class="task-text">${taskText}</span>
    </label>
    <button class="btn-delete">Xóa</button>
  `;

  taskList.appendChild(taskItem);
  taskInput.value = "";
  updateCount();
});

taskList.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-delete")) {
    e.target.closest(".task-item").remove();
    updateCount();
  }
});

taskList.addEventListener("change", function (e) {
  if (e.target.type === "checkbox") {
    const taskItem = e.target.closest(".task-item");
    if (e.target.checked) {
      taskItem.classList.add("completed");
    } else {
      taskItem.classList.remove("completed");
    }
    updateCount();
  }
});
function updateCount() {
  const uncompletedTasks = taskList.querySelectorAll(
    ".task-item:not(.completed)",
  );
  summary.textContent = `Còn ${uncompletedTasks.length} việc chưa xong`;
}

filterButton.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterButton.forEach(function (button) {
      button.classList.remove("active");
    });
    btn.classList.add("active");

    const filterType = btn.textContent.trim().toLowerCase();
    const tasks = taskList.querySelectorAll(".task-item");

    tasks.forEach(function (task) {
      const isCompleted = task.classList.contains("completed");
      if (filterType === "tất cả") {
        task.style.display = "flex";
      } else if (filterType === "chưa xong") {
        task.style.display = isCompleted ? "none" : "flex";
      } else if (filterType === "đã xong") {
        task.style.display = isCompleted ? "flex" : "none";
      }
    });
  });
});
