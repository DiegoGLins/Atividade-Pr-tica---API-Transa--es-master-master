import  { Request, Response } from "express";
import { users } from "../database/users";
import { Transaction, TransactionType } from "../models/transactions";
import { ApiResponse } from "../util/http-response.adapter";

export class TransactionController {
  public create(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const { title, value, type } = req.body;

      const user = users.find((user) => user.id === userId);

      if (!user) {
        return res.status(404).send({
          message: "User not found",
          ok: false,
        });
      }

      const newTransaction = new Transaction(title, value, type);
      user.transaction.push(newTransaction);

      return res.status(201).send({
        ok: true,
        message: "Transaction create with success!",
        data: user.transaction,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public list(req: Request, res: Response) {
    try {
      const { userId, transactionId } = req.params;

      const user = users.find((user) => user.id === userId);

      if (!user) {
        return res.status(404).send({
          message: "User not found",
          ok: false,
        });
      }

      const transactionsCheck = user.transaction.find(
        (transaction) => transaction.id === transactionId
      );

      if (!transactionsCheck) {
        return res.status(404).send({
          message: "User not found",
          ok: false,
        });
      }

      return res.status(200).send({
        ok: true,
        message: "Transactions sucessfully listed",
        data: transactionsCheck,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public listAllTransaction(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, type } = req.query;

      const user = users.find((user) => user.id === userId);

      if (!user) {
        return res.status(404).send({
          message: "User not found",
          ok: false,
        });
      }

      const allTransaction = user.transaction;

      const filterTransactionType = allTransaction.filter(
        (t) => t.type === type
      );
      const filterTransactionTitle = allTransaction.filter(
        (t) => t.title === title
      );

      if (type) {
        return res.json({
          message: "Transaction filted for type",
          trasaction: filterTransactionType,
        });
      }

      if (title) {
        return res.json({
          message: "Transaction filted for title",
          trasaction: filterTransactionTitle,
        });
      }

      let outcome = allTransaction
        .filter((t) => t.type === TransactionType.Outcome)
        .reduce((soma, transaction) => soma + transaction.value, 0);

      let income = allTransaction
        .filter((t) => t.type === TransactionType.Income)
        .reduce((soma, transaction) => soma + transaction.value, 0);

      return res.status(200).send({
        ok: true,
        message: `All transactions of user ${user.name}`,
        data: allTransaction,
        balace: { outcome, income, total: income - outcome },
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public delete(req: Request, res: Response) {
    try {
      const { userId, transactionId } = req.params;

      const user = users.find((user) => user.id === userId);

      if (!user) {
        return res.status(404).send({
          message: "User not found",
          ok: false,
        });
      }

      const findTransaction = user.transaction.findIndex(
        (t) => t.id === transactionId
      );

      if (findTransaction < 0) {
        return ApiResponse.notFound(res, 'transaction')
      }

      const deleteTransaction = user.transaction.splice(findTransaction, 1)

      return ApiResponse.success(res, 'Transction delete', deleteTransaction[0])


    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public update(req: Request, res: Response) {
    try {
      const { userId, transactionId } = req.params;

      const {title, value, type} = req.body

      const user = users.find((user) => user.id === userId);

      if (!user) {
        return res.status(404).send({
          message: "User not found",
          ok: false,
        });
      }

      const updateTransaction = user.transaction.find(
        (t) => t.id === transactionId
      );

      if (!updateTransaction) {
        return ApiResponse.notFound(res, 'transaction')
      }


      if(title){
        updateTransaction.title = title
      }
      

      if(type){
        updateTransaction.type = type
      }

      if(value){
        updateTransaction.value = value
      }
     
      return ApiResponse.success(res, 'Transaction successfully update', updateTransaction)
      

    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

}
