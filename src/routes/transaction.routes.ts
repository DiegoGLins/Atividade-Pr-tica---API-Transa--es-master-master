import { Router } from "express"
import { TransactionController } from "../controller/transaction.controller";

export const transactionsRoutes = () => {

const app = Router({
    mergeParams: true
});


app.post("/", new TransactionController().create)
app.get("/:transactionId", new TransactionController().list)
app.get("/", new TransactionController().listAllTransaction)
app.delete("/:transactionId", new TransactionController().delete)
app.put("/:transactionId", new TransactionController().update)


return app;

}