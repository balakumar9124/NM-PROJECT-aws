const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Dummy credentials for testing
const DUMMY_USERNAME = 'testuser';
const DUMMY_PASSWORD = 'testpassword';

// Configure AWS SDK (Ensure you have your AWS credentials set up properly)
AWS.config.update({
  accessKeyId: 'your-access-key-id', // Replace with your AWS Access Key ID
  secretAccessKey: 'your-secret-access-key', // Replace with your AWS Secret Access Key
  region: 'your-region' // e.g., 'us-east-1'
});

// Use body parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Route to handle user registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password match the dummy credentials
  if (username === DUMMY_USERNAME && password === DUMMY_PASSWORD) {
    res.status(201).send({ message: 'User registered successfully' });
  } else {
    res.status(401).send({ error: 'Invalid username or password' });
  }
});

// Route to handle file upload to S3
app.post('/upload', (req, res) => {
  const s3 = new AWS.S3();

  const params = {
    Bucket: 'your-s3-bucket-name', // Replace with your S3 bucket name
    Key: `uploads/${Date.now()}_file.txt`,
    Body: req.body.file, // Assuming file is sent as part of the request
    ContentType: 'text/plain'
  };

  s3.upload(params, function (err, data) {
    if (err) {
      return res.status(500).send({ error: 'Error uploading file', details: err.message });
    }
    res.status(200).send({ message: 'File uploaded successfully', data });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`SaaS app listening at http://localhost:${port}`);
});
