import express from 'express';
const app = express();
const port = 5000;

app.get('/', (req, res) => res.send('Welcome to thankplease!'));

app.listen(port, () => console.log(`Server running on http://localhost:${port} wut it dooooooooo`));
