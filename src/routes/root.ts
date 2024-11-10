import {Request, Response} from "express";

//in request we have access to the rq headers, body, query, cookies etc. 
//response - obj that going to be used by express to generate the response
export function root(request: Request, response: Response) {
  response.status(200).send("<h1>Express server is up and running!</h1>");
}