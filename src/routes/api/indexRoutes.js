import express from 'express';
import Controller from '../../controllers/IndexController';
// import auth from "../../middlewares/jwt";
import { verify } from "../../middlewares/authMiddleware";
import validation from '../../controllers/Validation';

const router = express.Router();


module.exports = router;