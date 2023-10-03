import mongoose from 'mongoose';

const Connection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, { useUnifiedTopology: true });
        console.log("DB connected successfully");
    } catch (error) {
        console.log("Error while connecting to DB!", error.message);
    }
}

export default Connection;
