const express = require('express');
const cors = require('cors');

const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API is running' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
