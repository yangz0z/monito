import mongoose from 'mongoose'; 

export const mongoDB = () => {
  mongoose
    .connect(process.env.MONGO_DB)
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log(err));
};