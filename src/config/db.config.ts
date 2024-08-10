import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_DATABASE;

const options = {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
};

export const db = mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin&retryWrites=true&w=majority`, options)
    .then(res => { 
        if(res){ 
            console.log('Connected to database')
        }
    })
    .catch((error: any) => {
        console.error('Error connecting to database', error)
        throw error;
    });