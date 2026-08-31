import express from "express";
import ejsMAte from 'ejs-mate';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from "url";
import connectDB from "./config/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

connectDB();

const port = process.env.PORT || 8080;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.engine('ejs', ejsMAte);
app.set('view engine', 'ejs');


app.get("/", (req, res) => {
  res.send('<h1>Index route</h1>');
});

app.get('/home', (req, res) => {
  res.render('home/index.ejs')
})

app.get("/task",(req, res) => {
  res.send("This is Task")
});

app.get("/notes",(req, res) => {
  res.send("This is notes")
});

app.get("/calender",(req, res) => {
  res.send("This is calender")
});

app.get("/home",(req, res) => {
  res.send("This is Meeting")
});

app.listen(port, () => {
  console.log(`Server is running on http//:localhost:${port}`);
});
