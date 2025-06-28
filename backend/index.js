import express from "express"; // react like method type=moduel in package json
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRauter from "./routes/userRautes.js";
import messsageRoute from "./routes/messageRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config({});

const app = express();

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cookieParser());

//Router 
app.use(`/api/v1/user`, userRauter);
app.use(`/api/v1/message`, messsageRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listen at port ${PORT}`);
});
