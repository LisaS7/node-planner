import express from "express"
import mongodb from "mongodb"
import dotenv from "dotenv"
import getDB from "./server/database.js"
import planner from "./server/routes/planner.route.js"

const app = express();

// Config
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use('/', planner)

app.all('*', (req, res) => res.status(404).send('Resource not found!'));



dotenv.config()

const MongoClient = mongodb.MongoClient
const PORT = process.env.PORT || 8000

MongoClient.connect(
    process.env.PLANNER_DB_URI
    // {
    //     maxPoolSize: 50,
    //     wtimeoutMS: 2500,
    //     useNewUrlParser: true
    // }
).catch(err => {
    console.error(err.stack)
    process.exit(1)
}).then(async client => {
    let plannerDB = getDB(client);
    
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
})