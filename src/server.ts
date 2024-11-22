import * as dotenv from "dotenv"; 
const result = dotenv.config();
if (result.error) {  
  //Only one place in the app where we using console.log
  console.log(`Error loading environment variables, aborting.`);  
  process.exit(1); //kill our processes with error call 1
}

console.log(process.env.PORT);

import * as express from 'express';
import { root } from './routes/root';
import { isInteger } from './utils';
import { logger } from "./routes/logger";
//console.log('Hello World'); 

const app = express(); //initializing express app

/*Here will be express end-poins
Each end-point, also known an express terminology, has a route 
should be written in its own separate file and then configured in 
setupExpress function*/
function setupExpress() {
  
  //handler, that going to answer all requests that hit to root point of our express app
  //http://localhost:9000/ - this is the root of the app
  app.route("/").get(root); 
}
function startServer() {
  //console.log(process.argv) //Node.js processes arguments, contains all command line arguments
  let port: number; //transform port number to type number
  const portEnv = process.env.PORT; //from .env
  const portArg = process.argv[2]; //port number from package.json start-dev-server
  
  if (isInteger(portEnv)) {
    port = parseInt(portEnv);
  }
  
  if (!port && isInteger(portArg)) {
    port = parseInt(portArg);
  }

  //default port, if it not passing in argv
  if (!port) { 
    port = 9050;
  }

  app.listen(port, () => {
    logger.info(`HTTP REST API Server is now running at http://localhost:${port}`);
  });
}

setupExpress();
startServer();