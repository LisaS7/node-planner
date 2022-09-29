/**
 *  Toggle a task on a given element. If class is on the selected element it will be removed.
 * Also ensures the class isn't on any other elements as only one element should be active at a time.
 * @param {Object} activeElement The element which the class should be applied to.
 * @param {String} className The name of the class to toggle.
 */
function setActiveClass(activeElement, className) {
  activeElement.classList.toggle(className);

  let previousActive = Array.from(document.getElementsByClassName(className));
  previousActive.forEach((element) => {
    if (element !== activeElement) {
      element.classList.remove(className);
    }
  });
}

/**
 *  Copy source cell text contents and background colour to target planner cell.
 * @param {Object} source The task element to copy from.
 * @param {String} target The planner element to copy to, defined by the class "planner-cell".
 */
function formatTargetCell(source, target) {
  target.value = source.querySelector(":scope > p").textContent;
  target.style.backgroundColor =
    getComputedStyle(source).getPropertyValue("background-color");
}

/**
 *  Get parameter value from current URL
 * @param {String} param The name of the parameter to return
 * @return {String} The current user ID
 */
function getURLParam(param) {
  const currentURL = new URL(window.location.href);
  try {
    return currentURL.searchParams.get(param);
  } catch (error) {
    console.log(error);
  }
}

// Page Elements
const taskCells = document.querySelectorAll(".task-cell");
const plannerCells = document.querySelectorAll(".planner-cell");
const clearPlansButton = document.querySelector("#clearUserPlans");
const form = document.querySelector("#planner-form");

// Event listeners
form.onsubmit = (e) => {
  const user = getURLParam("user");
  if (!user) {
    e.preventDefault();
    alert("Please select a user and then press the Change User button.");
  }
};

taskCells.forEach((task) => {
  task.addEventListener("click", () => {
    setActiveClass(task, "active-task");
  });
});
plannerCells.forEach((cell) => {
  cell.addEventListener("click", () => {
    let selectedTask = document.getElementsByClassName("active-task")[0];
    let selectedUser = document.querySelector("select").value;
    if (!selectedTask) {
      alert("Please select a task.");
    }
    if (!selectedUser) {
      alert("Please select a user.");
    }
    if (selectedTask.id === "erase-task") {
      cell.value = "";
      cell.style.backgroundColor = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--bg-colour");
    } else {
      formatTargetCell(selectedTask, cell);
    }
  });
});

clearPlansButton.addEventListener("click", (e) => {
  const user = getURLParam("user");
  if (!user) {
    e.preventDefault();
    alert("Please select a user.");
  }
  window.location.href = `./users/${user}/clearplans`;
});
