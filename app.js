const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const redis = require('redis');

const app = express();
const upload = multer({ dest: 'uploads/' });
const client = redis.createClient();

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const workbook = xlsx.readFile(file.path);
  const sheetName = workbook.SheetNames[0];
  const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  sheetData.forEach((row) => {
    const key = `data:${row.id}`;
    const value = JSON.stringify(row);
    client.set(key, value);
  });

  res.json({ message: 'Data uploaded to Redis successfully.' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});