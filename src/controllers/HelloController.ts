import { Request, Response } from "express";


class HelloController {

    async greeting(req:Request,res:Response) {
      return res.json("Hello Hacker Guy!");

    }
}

export default new HelloController();