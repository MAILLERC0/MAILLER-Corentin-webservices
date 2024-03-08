import app from    './app.js';

const port = process.env.SERVER_PORT || 5000;

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
})