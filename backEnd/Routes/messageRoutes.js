import express from "express";
import { sendMessage,getMessage} from "../Controlers/messageControlers.js";
import protectRoute from "../middleware/protectRoute.js";
import { sendImageMessage } from "../Controlers/messageControlers.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/api/sendmessage/:id",protectRoute,sendMessage);

router.post("/api/sendimagemessage/:id",protectRoute,upload.single("image"),sendImageMessage);

router.get("/api/getmessage/:id",protectRoute,getMessage);


export default router