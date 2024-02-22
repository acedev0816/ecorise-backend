// import modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from "morgan";
import path from "path";

// import routes
import nftRoute from "./routes/nft.js"

// parse env file
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// using dependencies
app.use(cors());
app.use(express.json());
app.use(morgan());
app.use(bodyParser.json({ limit: "5mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

// set assets folder
app.use('/uploads', express.static('uploads'));

// setup routers
app.use("/nft", nftRoute)
app.get('/', (req, res) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  console.log(`Ecorise server at ${port} PORT.`);
});

