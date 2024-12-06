import mongoose from "mongoose";

// process.env.DATABASE_URL || process.env.POSTGRES_URL!
// CREATE TABLE todos (
//   id SERIAL PRIMARY KEY,
//   text TEXT NOT NULL
// );

export async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            serverSelectionTimeoutMS: 5000,  // Timeout for server selection
            socketTimeoutMS: 45000,  // Timeout for socket operations
        });
        console.log("Connected to mongo by mongoose");
    } catch (e) {
        console.log(e);
    }
}