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

// Page Elements
const taskCells = document.querySelectorAll(".task-cell");
const plannerCells = document.querySelectorAll(".planner-cell");

// Event listeners
taskCells.forEach((task) => {
  task.addEventListener("click", () => {
    setActiveClass(task, "active-task");
  });
});
plannerCells.forEach((cell) => {
  cell.addEventListener("click", () => {
    let activeTask = document.getElementsByClassName("active-task")[0];
    if (activeTask) {
      cell.innerHTML = activeTask.textContent;
      cell.style.backgroundColor = getComputedStyle(activeTask).getPropertyValue('background-color');
    } else  {
      alert("Please select a task.");
    }
  });
});
