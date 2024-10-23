import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 4000;
const DB = process.env.MONGO_DB_URL?.replace('<db_password>', process.env.MONGO_DB_PASSWORD!);

mongoose.connect(DB!).then(() => console.log('Successfully connected to DB')).catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})