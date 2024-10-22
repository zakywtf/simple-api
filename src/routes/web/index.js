import express from "express";
import { verify } from "../../middlewares/authMiddleware";

const router = express.Router();

router.use('/', require('./indexRoutes'));

module.exports = router;