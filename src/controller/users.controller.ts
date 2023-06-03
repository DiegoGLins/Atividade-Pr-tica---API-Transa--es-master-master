import express, { Request, Response } from "express";
import { users } from "../database/users";
import { User } from "../models/user";
import * as fs from "fs";

export class UserController {
  public create(req: Request, res: Response) {
    try {
      const { name, cpf, email, age } = req.body;

      if (!name) {
        return res.status(400).send({
          ok: false,
          message: "Name was not provided",
        });
      }

      if (!cpf) {
        return res.status(400).send({
          ok: false,
          message: " CPF was not provided",
        });
      }

      if (!email) {
        return res.status(400).send({
          ok: false,
          message: "Email was not provided",
        });
      }

      if (!age) {
        return res.status(400).send({
          ok: false,
          message: "Age was not provided",
        });
      }

      const result = users.some((users) => users.cpf === cpf);

      if (result) {
        return res.status(400).json({
          ok: false,
          message: "CPF já cadastrado, tente novamente",
          data: users,
        });
      }

      const user = new User(name, age, cpf, email);
      users.push(user);

      return res.status(201).send({
        ok: true,
        message: " User was succesfully created",
        data: user,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public findUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = users.find((user) => user.id === id);
      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "User was not found",
        });
      }

      return res.status(200).send({
        ok: true,
        message: "User successfully listed",
        data: user.toJson(),
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
      const { name, email, cpf } = req.query;

      let allUsers = users;

      if (typeof name === "string") {
        allUsers = allUsers.filter((user) => user.name.includes(`${name}`));
      }

      if (typeof email === "string") {
        allUsers = allUsers.filter((user) => user.email.includes(`${email}`));
      }

      if (typeof cpf === "string") {
        allUsers = allUsers.filter((user) => user.cpf === cpf);
      }

      const listUsers = allUsers.map((user) => user.toJson());
      if (listUsers.length === 0) {
        return res.status(404).send({
          ok: false,
          message: "Users was not list",
        });
      }

      return res.status(200).send({
        ok: true,
        message: "Users successfully listed",
        data: allUsers,
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
      const { id } = req.params;

      const findUser = users.findIndex((user) => user.id === id);

      if (findUser < 0) {
        return res.status(404).send({
          ok: false,
          message: "Users was not found",
        });
      }
      const deletedUser = users.splice(findUser, 1);

      return res.status(200).send({
        ok: true,
        message: "User delete was success!",
        data: deletedUser[0].toJson(),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public edit(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, age } = req.body;

      const findUser = users.find((user) => user.id === id);

      if (!findUser) {
        return res.status(404).send({
          ok: false,
          message: "Users was not found",
        });
      }

      if (name) {
        findUser.name = name;
      }
      if (age) {
        findUser.age = age;
      }
      if (email) {
        findUser.email = email;
      }

      return res.status(200).send({
        ok: true,
        message: "User edit was success!",
        data: findUser.toJson(),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
