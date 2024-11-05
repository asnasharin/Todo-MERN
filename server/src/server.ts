import express,{ Express, Request, Response } from "express";
import mongoose from "mongoose"
import "dotenv/config"


const app = express();

const port = process.env.PORT

mongoose.connect(process.env.MONGO_URI as string).then(() => {
console.log("db conneted")
app.listen(port, () => {
    console.log("server running")
})
})
