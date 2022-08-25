import {addElement,toggleClass} from './functions.js';

// Page Elements
const taskCells = document.querySelectorAll('.taskcell');
const calendarTable = document.getElementById('calendar-table');
const dayHeaderRow = document.getElementById('day-headers');

// Config
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const times = ['8am', '10am', '12pm', '2pm', '4pm'];


// Create tasks list
taskCells.forEach(task => {
    task.addEventListener('click', () => {
        toggleClass(task, 'active-task');
    })
})

// Generate rows for each of the times
// Create a cell for each day with id
times.forEach(time => {
    let timeRow = addElement('tr', parent=calendarTable);
    addElement('td', parent=timeRow, content=time);
    weekdays.forEach(day => {
        // Create cell and set id
        let cell = addElement('td', parent=timeRow);
        cell.id = `${day.slice(0,3)}-${time}`;

        cell.addEventListener('click', () => {
            let activeTask = document.getElementsByClassName('active-task')[0];
            cell.innerHTML = activeTask.textContent;
            cell.style.backgroundColor = activeTask.style.backgroundColor;
        })
    })
})

