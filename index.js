const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors')

const app = express();
const port = 5000;

async function startServer() {
    try {
        await connectToMongo();
        console.log("Connected to MongoDB successfully");
        
        app.use(cors());
        app.use(express.json());

        // Available Routes
        app.use('/api/auth', require('./routes/auth'));
        app.use('/api/notes', require('./routes/note'));

        app.listen(port, () => {
            console.log(`iNotebook backend listening at http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Error starting server:", error.message);
    }
}

startServer();