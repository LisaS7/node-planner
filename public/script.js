/**
 *  Toggle a task on a given element. Also ensures the class isn't on any other elements.
 * @param {Object} activeElement The element which the class should be applied to.
 * @param {String} className The name of the class to toggle.
 */
function toggleClass(activeElement, className) {
  let otherActive = Array.from(document.getElementsByClassName(className));
  otherActive.forEach((inactiveElement) => {
    inactiveElement.classList.remove(className);
  });
  activeElement.classList.toggle(className);
}

// Page Elements
const taskCells = document.querySelectorAll(".task-cell");
const plannerCells = document.querySelectorAll(".planner-cell");

// Event listeners
taskCells.forEach((task) => {
  task.addEventListener("click", () => {
    toggleClass(task, "active-task");
  });
});
plannerCells.forEach((cell) => {
  cell.addEventListener("click", () => {
    let activeTask = document.getElementsByClassName("active-task")[0];
    if (activeTask) {
      cell.innerHTML = activeTask.textContent;
      cell.style.backgroundColor = activeTask.style.backgroundColor;
    }
  });
});
