#!/usr/bin/env ts-node

import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;
const apiAddress = process.env.API_ADRESS
const apiKey = process.env.API_KEY

app.use()

app.get("/", (req, res) => {
    res.send("received get request");
});
app.get("/test", (req, res) => {
    res.send("test success");
});


app.listen(port, () => console.log(`listening on port ${port}`));