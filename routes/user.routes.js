import { Router } from "express";
import { getAllUsers, getUser } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:id", getUser);

userRouter.post("/", (req, res) => {
  res.send({ title: "CREATE new user" });
});

userRouter.put("/:id", (req, res) => {
  res.send({ title: "UPDATE user details" });
});

userRouter.delete("/:id", (req, res) => {
  res.send({ title: "DELETE user" });
});

export default userRouter;
