import express from "express"
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();



class App {

     app;

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }


    middlewares():void {
      this.app.use(express.urlencoded({extended:true}))
      this.app.use(express.json());
      this.app.use(cors());
    }

    routes():void {

    }
}

export default new App().app;