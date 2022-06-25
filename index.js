import express from 'express';
import cors from 'cors';
import * as DB from './db/db.js';

// Create an express app
const app = express();
app.use(cors());
app.use(express.json());
// Connect to the database.
await DB.connect();

// Register a user route
app.post('/user', async (req, res) => {
  console.log('[ROUTE] POST /user');
  try {
    await DB.createUser(req.body);
    res.status(201).end();
  } catch (e) {
    console.error(e);
    res.status(403).send(e.message).end();
  }
});

// Create a cost route
app.post('/cost', async (req, res) => {
  console.log('[POST] /cost');
  try {
    await DB.createCost(req.body);
    res.status(201).end();
  } catch (e) {
    res.status(403).send(e.message).end();
  }
});

// Get costs report route
app.get('/report', async (req, res) => {
  console.log('[GET] /report');
  const id = req.query.id;
  const month_start_input = req.query.month_start;
  const month_end_input = req.query.month_end;
  const [year_start, month_start] = month_start_input
    .split('-')
    .map((d) => parseInt(d));
  const [year_end, month_end] = month_end_input
    .split('-')
    .map((d) => parseInt(d));
  const start_date = new Date(year_start, month_start - 1, 1);
  const end_date = new Date(year_end, month_end, 0);
  try {
    const report = await DB.getReport(id, start_date, end_date);
    res.status(200).json(report).end();
  } catch (e) {
    // send the error as json
    res.status(403).send(e.message).end();
  }
});
// Listen to connections
app.listen(process.env.PORT || 8080, async () => {
  console.log('App started');
});
