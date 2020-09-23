// imports
import express from "express";
import mongoose from "mongoose";
import dbMessages from "./dbMessages.js";
import Messages from "./dbMessages.js";

// app config
const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(express.json());

// db config
const connection_url =
  "mongodb+srv://Admin:LgXCfPVNC0Upd3k3@cluster0.nphp3.mongodb.net/whatsappdb?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  userCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// api routes
app.get("/", (req, res) => res.status(200).send("Hello world"));
app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`new message created: \n ${data}`);
    }
  });
});

// listeners
app.listen(port, () => console.log(`Listening on localhost:${port}`));
