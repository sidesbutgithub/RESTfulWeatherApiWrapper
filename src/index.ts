#!/usr/bin/env ts-node

import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;
const apiAddress = process.env.API_ADDRESS;
const apiKey = process.env.API_KEY;

app.use(express.json());

app.get("/:location", async (req, res) => {
    const {location} = req.params;

    try{
        const response = await fetch(`${apiAddress}${location}?key=${apiKey}`);
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        res.status(200).json({"data": data});
    }
    catch (e){
        console.log(e)
        res.status(400).send(e)
    }


});

app.get("/:location/:date1", async (req, res) => {
    const {location, date1} = req.params;
    
    try{
        const response = await fetch(`${apiAddress}${location}/${date1}?key=${apiKey}`);
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        res.status(200).json({"data": data});
    }
    catch (e){
        console.log(e)
        res.status(400).send(e)
    }
});

app.get("/:location/:date1/:date2", async (req, res) => {
    const {location, date1, date2} = req.params;
    
    try{
        const response = await fetch(`${apiAddress}${location}/${date1}/${date2}?key=${apiKey}`);
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        res.status(200).json({"data": data});
    }
    catch (e){
        console.log(e)
        res.status(400).send(e)
    }
});

app.get("/", (req, res) => {
    res.status(400).send("Location is a required route")
});

app.all("/*splat", (res, req) => {
    req.status(404).send("Resourse Not Found");
})

app.listen(port, () => console.log(`listening on port ${port}`));