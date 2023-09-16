import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoute from "./routes/user.route.js"
import gigRoute from "./routes/gig.route.js"
import reviewRoute from "./routes/review.route.js"
import orderRoute from "./routes/order.route.js"
import messageRoute from "./routes/message.route.js"
import conversationRoute from "./routes/conversation.route.js"
import authRoute from "./routes/auth.route.js"

const app = express()
dotenv.config()
mongoose.set('strictQuery',true)

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB")
  } catch (error) {
    console.log(error);
  }
}

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/orders", orderRoute)
app.use("/api/reviews", reviewRoute)
app.use("/api/gigs", gigRoute)
app.use("/api/messages", gigRoute)
app.use("/api/conversations", conversationRoute)

app.use(express.json())

app.listen(8800, () => {
  connect()
  console.log("Backend running")
})