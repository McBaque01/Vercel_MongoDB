// import mongoose from "mongoose";
// const uri = process.env.MONGODB_URI;
// export const connectDb = async () => {
//     try {
//         if (!uri) {
//             throw new Error("MONGODB_URI environment variable is not defined");
//         }
//         await mongoose.connect(uri);
//         console.log("Connected to MongoDB successfully");
//     }
//     catch (error) {
//         console.error("Failed to connect to MongoDB:", error);
//     }
// };

import { MongoClient, ServerApiVersion, Db } from 'mongodb'

const uri = "mongodb+srv://vercel-admin-user:hBojOvCZeapjKL4j@cluster0.npib522.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


let db = Db;

export async function connectDatabase() {
    try {
        await client.connect();
        db = client.db("Portfolio");
        await db.command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Propagate the error to the caller
    }
}
export function getDatabase() {
    if (!db) {
        throw new Error('Database is not connected');
    }
    return db;
}

export async function closeDatabase() {
    try {
        await client.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error closing database connection:', error);
        throw error; // Propagate the error to the caller
    }
}

export async function insertUser(userData) {
    const db = client.db("Portfolio");
    const users = db.collection('Users');
    
    try {
        const result = await users.insertOne(userData);
        console.log('Inserted document:', result.insertedId);
        return result; // Return the inserted user document
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error; // Propagate the error to the caller
    }
}

