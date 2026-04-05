import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import connectDB from "./config/db.js";
import { setPost, getPosts, GetUsers, GetAllMessages, SetMessages } from "./controllers/posts.controller.js";
// import path from "path";

// # Connection a mongodb
connectDB();

// ! Constante du server
const app = express();
const PORT = 2000;
// const __dirname = path.resolve();

app.use(express.json()); // ? Creation d'un Middleware
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://chat-app-boris.vercel.app/",
    method: ["GET", "POST"],
    credentials: true
  },
});

// ! Ajout et selection de l'utilisateur
// # Ecoute de la connection d'un utilisateur
// io.on("connection", (socket) => {
//   console.log("User Connected with ID:", socket.id);

//   // # Ecoute de l'enregistrement d'un utilisateur
//   socket.on("AddUser", (formData) => {
//     setPost(formData); // ? Post d'un utilisateur
//     console.log("Donnees recu:", formData);
//   });
// 	// # Test d'emission et de reception de message de react vers node et node vers react
// 	socket.on("PingReact", data => console.log("Donnee Recu de react:",data));
// 	socket.emit("Test","Salut, React c'est Node");

//   // # Ecoute du login d'un utilisateur
//   socket.on("Login", async (formData) => {
//     const User = await getPosts(formData);
//     if (User.length === 0) {
//       	console.log("Aucun utilisateurs");
//     } else {
// 		// # Envoie d'un utilisateur (Author) au front-end
// 		socket.emit("User", User);
//       	console.log("Utilisateur / Author a selectionner:", User);
//     }
//   });

//   // # Ecoute de la deconnection d'un utilisateur
//   socket.on("disconnect", () => {
//     console.log("User was disconnected");
//   });
// });

io.on("connection", (socket) => {
  console.log("User Connected with ID:", socket.id);

  socket.on("AddUser", (formData) => {
    setPost(formData);
    // console.log("Données reçues:", formData);
  });

  socket.on("PingReact", (data) => {
    // console.log("Reçu de React:", data);
    socket.emit("Test", "Salut React, bien reçu !");
  });

  socket.on("Login", async (formData) => {
    const User = await getPosts(formData);
    if (User.length === 0) {
      console.log("Aucun utilisateur");
    } else {
      // console.log("Utilisateur sélectionné:", User[0]);
      socket.emit("User", User[0]); // # envoyer un seul objet
      const TabMessages = await GetAllMessages();
      socket.emit("Send_historic", TabMessages);
    }
  });

  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });

  // ! Selection d'un utilisateur dans la base de donnee
  socket.on("GetUsers", async (password) => {
	const TabUsers = await GetUsers (password);
	socket.emit("FetchUsers", TabUsers);
	// console.log("Tableau des utilisateurs:",TabUsers);
  });

  // ! Ecoute de l'envoie du message
  socket.on("send_message", async (messageData) => {
	// console.log("Message Recu de react:",messageData);
	// ! Insertion du message dans la base de donnee
	SetMessages(messageData);
	// ! Envoie du message au client
	
    socket.broadcast.emit("recieve_message", messageData);
    console.log("Message envoyer au client:",messageData);
	// console.log("Tableau des message cote serveur:",TabMessages);
  });
  
});

// # Test API
app.get("/",(req, res) => {
	res.send("End Point...");
});

// ! Lancement de l'application
server.listen(PORT, () => console.log("Server is running on port:", PORT));
