const calendarTable = document.getElementById('calendar-table');
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const times = ['8am', '10am', '12pm', '2pm', '4pm'];

function addElement (elementString, parent, content = null) {
    let element = document.createElement(elementString);
    parent.appendChild(element);
    if (content) {
        element.innerHTML = content;
    }
    return element;
}


// Create header row and populate with days text.
// One blank cell is add at the start - this will contain the times.
const dayHeaderRow = addElement('tr', calendarTable);
addElement('td', dayHeaderRow);
weekdays.forEach(day => {
    addElement('td', parent = dayHeaderRow, content = day);
})

// Generate rows for each of the times
// Create a cell for each day with id
times.forEach(time => {
    let timeRow = addElement('tr', calendarTable);
    addElement('td', parent = timeRow, content = time);
    weekdays.forEach(day => {
        
        let cell = addElement('td', timeRow);
    })
})