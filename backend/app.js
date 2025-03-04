import {} from 'dotenv/config';
import connectDB from './db/connect.js';
import express from 'express';
import routes from './routes/routes.js';
import cors from 'cors';

// Create an express object
const app = express();

// Since fronend and backend are running on different ports, allow for 
//  Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Specifically set the public folder as the static folder
app.use(express.static('public'));

// set up middleware to parse incoming JSON request bodies and make them
//  available for req.body
app.use(express.json());

// middleware to parse URL_encoded data in simple key-value pairs 
//  available for req.body
app.use(express.urlencoded({extended: false}))

// Load routes into our main file
app.use('/', routes);

const PORT = process.env.PORT || 5000;

const init = async () => {
    try {
        await connectDB(process.env.DB);
        console.log("Successfully Connected to Database...");

        app.listen(PORT, () => console.log(`Listening on Port: ${PORT}.`));
    }
    catch(err) {
        console.log(err);
    }
}

init();