import express, {Request,Response} from "express"
import { users } from "./database/users";
import { userRoutes } from "./routes/user.routes";


const app = express();
app.use(express.json());


app.use("/user", userRoutes());

app.listen(3333, () => {
    console.log(" Api rodando ...");
    
})

