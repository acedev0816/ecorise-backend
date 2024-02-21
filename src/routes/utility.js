import express from "express";
import {upload} from "../controllers/utility.js";

const router = express.Router();
router.post(
  "/upload",
  upload
)

export default router;