import mongoose from "mongoose";

const uri: string | undefined = process.env.MONGODB_URI;

export const connectDb = async () => {
    try {
        if (!uri) {
            throw new Error("MONGODB_URI environment variable is not defined");
        }

        await mongoose.connect(uri);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};
