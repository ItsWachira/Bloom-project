import path from "path";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import responseTime from "response-time";
import router from "./routes";
import DBConnect from "./config/db";
import connection from "./sockets";
import { startMetricsServer, restResponseTimeHistogram } from "./metrics/index";
require("dotenv").config();
// Initialize Express app
const app = express();
const httpServer = createServer(app);

// Initialize Socket.IO server
export const io = new Server(httpServer, {
    cors: {
        origin: [
            process.env.CLIENT_URL,
            "http://localhost:3000",
            "http://localhost:4000",
        ],
        methods: ["GET", "POST"],
    },
});

// Define port
const PORT = process.env.PORT || 5000;

// CORS options
const corsOptions = {
    credentials: true,
    origin: [
        "http://localhost:3000",
        "http://localhost:4000",
    ],
};

// Set view engine and views directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(router);

// Middleware for response time measurement
app.use(responseTime((req, res, time) => {
    if (req?.route?.path) {
        restResponseTimeHistogram.observe({
            method: req.method,
            route: req.route.path,
            status_code: res.statusCode
        }, time * 1000);
    }
}));

// Connect to database
DBConnect();

// Socket.IO connection handler
io.on("connection", (socket) => connection(socket, io));

// Base route
app.get("/", (req, res) => {
    res.status(200).json({ msg: "Hello there" });
});

// Start HTTP server
httpServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    startMetricsServer();
});
