import mongoose from "mongoose";

const URL = "";
const dbConnect = async () => {
  try {
    await mongoose.connect(URL);
    console.log("db Connected");
  } catch (error) {
    console.log(error.message);
  }
};
export default dbConnect;
