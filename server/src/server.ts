import express,{ Express, Request, Response } from "express";
import mongoose from "mongoose"
import cors from "cors"
import morgan from "morgan"
import userRouter from "../src/routes/userRoutes"
import "dotenv/config"


const app = express();

const corsConfig = {
    origin: "*",
    credentials: true,
}
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors(corsConfig))
app.use(morgan("dev"))

app.use("/api", userRouter)


const port = process.env.PORT

mongoose.connect(process.env.MONGO_URI as string).then(() => {
console.log("db conneted")
app.listen(port, () => {
    console.log("server running")
})
})
