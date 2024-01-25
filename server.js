import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});