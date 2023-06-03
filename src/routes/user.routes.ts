import { UserController } from "../controller/users.controller";
import { Router } from "express"
import { transactionsRoutes } from "./transaction.routes";

export const userRoutes = () => {


const app = Router();

app.post("/", new UserController().create)
app.get("/:id", new UserController().findUser)
app.get("/", new UserController().list)
app.delete("/:id", new UserController().delete)
app.put("/:id", new UserController().edit)

app.use("/:userId/transactions", transactionsRoutes())

return app;

}