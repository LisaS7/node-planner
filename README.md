This is my first node app and my first encounter with MongoDB. The app displays a calendar which can be populated with tasks for the week.

How It Works
The app runs using a node.js Express server. The calendar grid is generated using JavaScript.

1. Open the directory in a terminal
2. Run npm start
3. Go to http://localhost:5000/ in a browser

Configuration
Weekdays and times can be changed in the config.json file.

What I learned
- node.js
- Express
- ejs template engine
- MongoDB

Challenges
- The app refused to connect to MongoDB, raising a MongoServerSelectionError. After some troubleshooting using the Atlas CLI, I realised that I'd set the MongoDB cluster access for only my IP, which had changed after I rebooted my router the previous day. I've now learned how to check the IP address access list in the Atlas CLI and how to allow all IP addresses to access the database.
- Submitting table data as a form (tbc)
