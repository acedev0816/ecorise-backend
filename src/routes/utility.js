import express from "express";
import {upload, nftMint} from "../controllers/utility.js";

const router = express.Router();

router.post(
  "/upload",
  upload
)

router.post(
  "/nftmint",
  nftMint
)

export default router;