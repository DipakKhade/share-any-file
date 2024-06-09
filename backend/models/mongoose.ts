import mongoose from "mongoose";

export async function connectTodb() {
    await mongoose.connect('mongodb://localhost:27017/file-share', {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
}

