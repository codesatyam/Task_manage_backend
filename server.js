const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Treasurer:treasure@cluster1.ilidknz.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1);
});

// Route for tasks
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);
app.use('/', (req,res)=>{
    res.send("Nice working");
});
//  server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
