// import modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

// import routes
import utilityRoute from "./routes/utility.js"

// parse env file
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// using dependencies
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "5mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

// setup routers
app.use("/utility", utilityRoute)
app.get('/', (req, res) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  console.log(`Ecorise server at ${port} PORT.`);
});

