import express from "express";
import cookieParser from "cookie-parser";

import { PORT } from "./config.js";
import ApiResponse from "./helpers/apiResponse.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


app.get("/", (req, res) => {
    const data = {
        message: "Server is starting"
    };
    const meta = { timestamp: new Date().toISOString() };

    return ApiResponse.send(res, data, null, meta);
});

// Include routers

import ApiRouters from "./routers/api.js";

app.use("/api", ApiRouters);


try {
    app.listen(PORT, () => {
        console.log("Server started successs!");
    });
} catch (error) {
    console.log(error);
}