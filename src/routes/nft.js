import express from "express";
import {mint} from "../controllers/nft.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
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