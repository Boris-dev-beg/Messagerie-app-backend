import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect("mongodb://localhost:27017/users");
        console.log("Connection a mongoDB effectuer avec succes !")
    } catch (error) {
        console.error("Erreur de connection a mongoDB:",error);
    }
}

export default connectDB;