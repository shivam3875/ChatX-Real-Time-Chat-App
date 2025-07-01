import express from "express";
import { sendMessage,getMessage} from "../Controlers/messageControlers.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/api/sendmessage/:id",protectRoute,sendMessage);

router.get("/api/getmessage/:id",protectRoute,getMessage);


export default router