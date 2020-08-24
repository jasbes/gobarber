import express from 'express';

const app = express();

app.use(express.json());

app.get('/repositories', (request, response) => {
  return response.json('Hello world');
});

app.listen(3333, () => {
  console.log('Server is up...');
});
