import express from "express";
import path from 'path';
import ejsMate from 'ejs-mate';
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { uptime } from "process";

//==================================================
//  1. ENVIRONMENT & PATH INITIALIZATION
//==================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


//============================================
// 2. VIEW ENGINE SETUP
//============================================

//view engine config
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// =====================================
// 3. GLOBAL MIDDLEWARE
//======================================
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


//=======================================
// HEALTH CHECK ENDPOINT
//=======================================

app.get("/api/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'UP' : 'DOWN';

  const status = dbStatus === 'UP' ? 200 : 503;

  res.status(status).json({
    status: dbStatus === 'UP' ? 'healthy' : 'Unhealthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: {
      database: dbStatus
    }
  });
});


//======================================
//   4. APPLICATION ROUTES
//======================================

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


// 5. SERVER LIFE CYCLE CONTROL
// Export the configured application instance

export default app;