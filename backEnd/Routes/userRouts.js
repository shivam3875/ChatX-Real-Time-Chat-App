import express from "express";
import { getUsers } from "../Controlers/usersControler.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/api/getusers",protectRoute,getUsers);

export default router