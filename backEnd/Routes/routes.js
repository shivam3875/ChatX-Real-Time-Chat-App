import express from "express";
import { Register,Login,Logout } from "../Controlers/controles.js";

const router = express.Router();

router.post("/api/register",Register);

router.post("/api/login",Login);

router.post("/api/logout",Logout);


export default router