const redis = require('redis');

// Create a Redis client
const client = redis.createClient();

// Handle Redis connection events
client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (error) => {
  console.error('Redis Error:', error);
});

// Define the key-value data to be stored in Redis
const data = {
  name: 'John Doe',
  age: 30,
  occupation: 'Developer',
};

// Store data in Redis
client.hmset('user', data, (error, result) => {
  if (error) {
    console.error('Failed to store data in Redis:', error);
  } else {
    console.log('Data stored in Redis:', result);
    client.quit(); // Close the Redis connection
  }
});