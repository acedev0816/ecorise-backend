import express from "express";
import { mint, status, upload } from "../controllers/nft.js";
import multer from "multer";
import { ENVIRONMENT } from "../constant.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
    console.log("ENVIRONMENT", ENVIRONMENT);
    console.log("file", file);
  },
});
const multerInstace = multer({ storage });

router.post("/mint", mint);
router.post("/upload", multerInstace.single("image"), upload);

router.get("/status", status);

export default router;
