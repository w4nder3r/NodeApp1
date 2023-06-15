const Redis = require('ioredis');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Configure Redis connection
const redis = new Redis();

// Parse JSON bodies
app.use(bodyParser.json());

// Handle POST request to store user data
app.post('/storeUserData', async (req, res) => {
  try {
    const { name, age, phone, email, city } = req.body;

    // Store user data in Redis
    await redis.hmset('user', ['name', name, 'age', age, 'phone', phone, 'email', email, 'city', city]);

    res.json({ message: 'User data stored in Redis successfully!' });
  } catch (error) {
    console.error('Error storing user data in Redis:', error);
    res.status(500).json({ message: 'An error occurred while storing user data.' });
  }
});

// Serve the frontend HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});