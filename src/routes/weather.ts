import { Router } from "express";
import { fetchForcast, checkCache } from "../controllers/controller.js";
const weatherRouter = Router();

weatherRouter.get("/:location", checkCache);

weatherRouter.get("/:location", fetchForcast);

weatherRouter.get("/", (req, res, next) => {
    res.status(400).send("Weather location not provided");
    console.log(next)
    next()
})

export {weatherRouter};