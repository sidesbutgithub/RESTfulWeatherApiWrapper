# Weather API Wrapper
RESTful api wrapping open sourse weather API: VisualCrossing

## Prerequisites
1. NodeJS & Node Package Manager (NPM) for installation
2. A VisualCrossing account and API key
3. A Redis database for caching
4. (Optional but recommended) git for repo cloning

## Set-up
# Installation
Clone the repo with git (or download the project manually), cd into the directory and run `npm install` to install dependancies and `npm run build` to build the Node JS files
```
git clone https://github.com/sidesbutgithub/RESTfulWeatherApiWrapper
cd RESTfulWeatherApiWrapper
npm install
npm run build
```

# .env file
Create a file named .env containing the following environment variables in the root directory of the project
```
PORT = <the port which you want your api to be accessed from>
API_KEY = <your visualcrossing api key>
API_ADDRESS = https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
REDIS_HOST = <the address at which your redis database is hosted>
REDIS_PORT = <the port at which your redis database is accessed>
```

# Usage
In the root directory of the project, run `node .` to start the api  
In the terminal you should see `listening on port <port assigned in .env>`

## Routes
```
/weather/<location>
```
This route checks the redis cache for recent weather data on the provided location and returns it if found  
If not found, it sends a request to the visualcrossing Api for that data, caches it for future requests and returns the data

