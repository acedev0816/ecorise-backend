import express from "express";
import {upload, mintnft} from "../controllers/utility.js";

const router = express.Router();
router.use("/upload", upload)
router.use('/mintnft', mintnft);

export default router;