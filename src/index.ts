#!/usr/bin/env ts-node

import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;
const apiAddress = process.env.API_ADDRESS
const apiKey = process.env.API_KEY
const testLocation = process.env.TEST_LOCATION

//app.use(express.json())

app.get("/", async (req, res) => {
    const response = await fetch(`${apiAddress}${testLocation}?key=${apiKey}`);
    console.log(`${apiAddress}${testLocation}?key=${apiKey}`)
    const data = await response.json()

    res.status(200).json({"data": data});
});

app.get("/test", (req, res) => {
    res.send("test success");
});

app.listen(port, () => console.log(`listening on port ${port}`));