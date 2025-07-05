import { Response, Request } from "express";
import dotenv from "dotenv";

dotenv.config();

const apiAddress = process.env.API_ADDRESS;
const apiKey = process.env.API_KEY;

async function checkCache(req: Request, res: Response, next: Function){
    if (!req.app.locals.cache){
        next("route");
        return;
    }
    const cache = req.app.locals.cache;
    const {location} = req.params;
    const data = JSON.parse(await cache.get(location));
    if (!data){
        next("route");
        return;
    }
    res.status(200).json(data);
}

async function fetchForcast(req: Request, res: Response, next: Function){
    const {location} = req.params;
    res.locals.location = location;
    
    try{
        const response = await fetch(`${apiAddress}${location}/${new Date().toISOString().slice(0,10)}?key=${apiKey}&include=days`);
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        res.locals.data = await response.json();
        const cache = req.app.locals.cache;
        if (cache){
            const todayEnd = Math.floor((new Date().setHours(23, 59, 59, 999))/1000);
            const now = Math.floor((Date.now())/1000)
            await cache.set(location, JSON.stringify(res.locals.data), {EX: todayEnd-now});
        }
        res.status(200).json(res.locals.data);
        
    }
    catch (e){
        console.log(e);
        res.status(400).send(e);
    }
}

export {fetchForcast, checkCache}