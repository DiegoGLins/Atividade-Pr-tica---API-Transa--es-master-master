import express, {Request,Response} from "express"
import { users } from "./database/users";
import { userRoutes } from "./routes/user.routes";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


app.use("/user", userRoutes());

app.listen(process.env.PORT, () => {
    console.log(" Api rodando ...");
    
})

