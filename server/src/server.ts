import app from "./app";
import { env } from "./utils/envvalid";
import mongoose from "mongoose";

const PORT = env.PORT || 5000;

mongoose.connect(env.MONGO_URI).then(() => {
  console.log("Database connected successfully");
  app.listen(PORT, () =>
    console.log(`server running on port ${PORT}`)
  );
});