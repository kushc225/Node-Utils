import mongoose from "mongoose";
const URL =
  "mongodb+srv://root:Root5600@cluster0.bwckus6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbConnect = async () => {
  try {
    await mongoose.connect(URL);
    console.log("db Connected");
  } catch (error) {
    console.log(error.message);
  }
};
export default dbConnect;
