import express from "express";
import http from "http";
import cors from "cors";
import {Server} from "socket.io";

import connectDB from "./config/db.js";
// import { setPost, getPosts } from "./controllers/posts.controller.js";
// import path from "path";

// ? Connection a mongodb
connectDB();

const app = express();
const server = http.createServer(app);

const PORT = 2020;

app.use(cors());
const io = new Server (server, {
    cors:{
        orign: "http://localhost/5173",
        method: ["GET", "POST"]
    }
})

io.on("connection", (socket)=>{
    console.log("UTILISATEUR CONNECTER AVEC L'ID :",socket.id);

    socket.emit("Test", "Salut REACT c'est node");
    socket.on("Pong",(text) => console.log("MESSAGE recus de React:",text));
	socket.on("Login",(Datas) => console.log("Donnees recu:",Datas));

    socket.on("disconnect", () => console.log("UTILISATEUR DECONNECTER..."));
});

server.listen(PORT, () => console.log("Server is running on port:",PORT));