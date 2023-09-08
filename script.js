const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector(".list-container");
const btnAddTask = document.querySelector(".btnAddTask");
const btnCheck = document.querySelector(".btn-checked");
const btnRemove = document.querySelector(".btn-remove");

const addTaskEl = function () {
  if (inputBox.value === "") {
    alert("You must write something!");
    return;
  }

  if (inputBox.value.split(" ").length === 1 && inputBox.value.length > 100) {
    alert("Please write another word!");
    inputBox.value = "";
    return;
  }

  const task = `<li class="task">
                  <img src="images/unchecked.png" class="btn-checked" />
                  ${inputBox.value} 
                  <img src="images/cancel.png" class="btn-remove" />
                </li>`;
  listContainer.insertAdjacentHTML("beforeend", task);
  saveData();
  inputBox.value = "";
};

btnAddTask.addEventListener("click", addTaskEl);
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTaskEl();
});

listContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-checked")) {
    const task = e.target.closest(".task");
    task.classList.toggle("checked");
    e.target.src = `images/${task.classList.contains("checked") ? "" : "un"}checked.png`;
    saveData();
  }

  if (e.target.classList.contains("btn-remove")) {
    e.target.parentElement.remove();
    saveData();
  }
});

const saveData = function () {
  localStorage.setItem("toDos", listContainer.innerHTML);
};

const loadData = function () {
  listContainer.innerHTML = localStorage.getItem("toDos");
};
loadData();
