#!/usr/bin/env node

import express from "express";
import dotenv from "dotenv";
import { weatherRouter } from "./routes/weather.js"
import { createClient } from "redis";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15minutes = 15*60 seconds, 1000 ms
    max: 5
});

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(limiter);

app.locals.cache = null;

//app cannot start listening until connection to cache is established due to the cache automatically trying to reconnection
const client = await createClient()
    .on("error", (err) => {
        console.log("Redis Client Error, Cache Unavailable", err);
        app.locals.cache = null;
    })
    .connect();

app.locals.cache = client;

app.use(express.json());

app.use("/weather", weatherRouter);

app.use("/", (req, res) => {
    res.status(404).send("Resourse Not Found");
})

app.all("/*splat", (req, res) => {
    console.log("huh")
    console.log(typeof res);
    res.status(404).send("Resourse Not Found");
})

app.listen(port, () => console.log(`listening on port ${port}`));