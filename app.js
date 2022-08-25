import express from "express"
import planner from "./routes/planner.route.js"
const app = express();

// Config
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use('/', planner)

app.all('*', (req, res) => res.status(404).send('Resource not found!'));

export default app