import express from "express";
import {mint} from "../controllers/nft.js";
import multer from "multer";
import { ENVIRONMENT } from "../constant.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("ENVIRONMENT", ENVIRONMENT);
    cb(null, ENVIRONMENT === 'develop' ? 'public/uploads/': 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
    console.log("file", file);
  }
});
const multerInstace = multer({storage})

router.post(
  "/mint",
  multerInstace.single('image'),
  mint
)



export default router;