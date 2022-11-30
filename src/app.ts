import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import helloRoutes from "./routes/helloRoute";
import customerRouter from "./routes/customerRoute";
import { errorMiddleware } from "./middlewares/error";

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
      this.app.use(errorMiddleware);
    }

    routes():void {
      this.app.use("/",helloRoutes);
      this.app.use("/api/v1/",customerRouter);
    }

    dbConnection():void {
      AppDataSource.initialize().then(() => {
        console.log("Iniciou a conexão com o banco")
      })
    }

}

export default new App().app;