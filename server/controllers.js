import fs from "fs"

// Helper Functions
function getJSONData(filepath) {
    let data = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(data);
}


const calendar = (req, res) => {
    let {tasks, weekdays, times} = getJSONData('config.json');
    res.render('pages/index', {
        tasks: tasks,
        weekdays: weekdays,
        times: times
    });
}

const tasks = (req, res) => {
    res.render('pages/manage_tasks');
};

const users = (req, res) => {
    res.render('pages/manage_users');
};

export {calendar, tasks, users}