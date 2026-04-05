// ! Importation
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js"
import path from "path";

// ! Variables
const PORT = 1000;
const NODE_ENV = "production";
const __dirname = path.resolve();
const app = express();

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        method: ["GET", "POST"]
    }
});

// ! Listeners
app.use("/auth",authRouter);
app.use("/message",messageRoute);

try {
    if(NODE_ENV === "production"){
        app.use(express.static(path.join(__dirname, "../Client")));
        app.get("*", (req,res) => {
            res.sendFile(path.join(__dirname, "../Client/index.html"));
        })
    }
} catch (error) {
    console.log(error);
}


io.on("connection", (socket) => {
    console.log("Un utilisateur s'est connecter:", socket.id);

    socket.on("join_room", (room, name) => {
        socket.join(room);
        socket.to(room).emit("Add_user", name);
        console.log(`User with ID: ${socket.id}, join the room: ${room}`);
    })
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("recieve_message", data);
        console.log(`User with ID: ${socket.id}, send message: ${data.message}`);
    });
    socket.on("disconnect", () => console.log("l'utilisateur s'est deconnecter : ", socket.id));
});

// ! Lancement du server
server.listen(PORT, () => console.log("Server is starting on port : " + PORT));