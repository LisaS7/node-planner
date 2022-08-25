import {addElement,toggleClass} from './functions.js';

// Page Elements
const taskRow = document.getElementById('task-row')
const calendarTable = document.getElementById('calendar-table');
const dayHeaderRow = document.getElementById('day-headers');

// Config
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const times = ['8am', '10am', '12pm', '2pm', '4pm'];
const tasks = ['Study', 'Jog', 'Housework'];


// Create tasks list
tasks.forEach(task => {
    let taskCell = addElement('td', parent=taskRow, content=task);
    taskCell.addEventListener('click', () => {
        toggleClass(taskCell, 'active-task');
    })
})


// Create header row and populate with days text.
// One blank cell is add at the start - this will contain the times.
weekdays.forEach(day => {
    addElement('td', parent=dayHeaderRow, content=day);
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

