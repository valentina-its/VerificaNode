require('dotenv').config();
const { connectDB } = require('./src/db');
const app = require('./src/app');

connectDB();

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
