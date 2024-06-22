import dotenv from "dotenv";
import "dotenv/config";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";  // Import cors
import connectDB from "./config/db.js";
import { protect } from "./middleware/authMiddleware.js";
import errorHandler from "./middleware/error.js";
import logger from "./middleware/logger.js";
import notFound from "./middleware/notFound.js";
import authRoutes from "./routes/authRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();

const port = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

// Enable CORS for Express
app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", protect, userRoutes);
app.use("/api/messages", protect, messageRoutes); 
app.use("/api/groups", protect, groupRoutes);

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('sendMessage', (message) => {
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Error handler
app.use(notFound);
app.use(errorHandler);

// Listen on the server
server.listen(port, () => console.log(`Server is running on port ${port}`));
