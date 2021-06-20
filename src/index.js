import { port } from "./config.js";
import Logger from "./core/loggerHandler.js";
import app from "./app.js";
import { connectToMongoDB } from "./database/mongo/index.js";
// import { io } from "socket.io";
// import express from "express";

// io(express.Router({ cors: { origin: "*" } }));

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("message", (message) => {
//     console.log(message);
//     io.emit("message", `${socket.id.substr(0, 2)} said ${message}`);
//   });
// });

app
  .listen(port, async () => {
    console.log(
      "\u001b[" + 35 + "m" + `Server running on port : ${port}` + "\u001b[0m",
      process.env.MONGO_URI
    );
    await connectToMongoDB();
  })
  .on("error", (e) => Logger.error(e));
