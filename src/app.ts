import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./database/data-source";
import helloRoutes from "./routes/HelloRoute";

dotenv.config();



class App {

     app;

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
        this.dbConnection();
    }


    middlewares():void {
      this.app.use(express.urlencoded({extended:true}))
      this.app.use(express.json());
      this.app.use(cors());
    }

    routes():void {
      this.app.use(helloRoutes);
    }

    dbConnection():void {
      AppDataSource.initialize().then(() => {
        console.log("Iniciou a conexão com o banco")
      })
    }
}

export default new App().app;