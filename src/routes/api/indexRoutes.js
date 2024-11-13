import express from 'express';
import controller from '../../controllers/IndexController';
// import auth from "../../middlewares/jwt";
import { verify } from "../../middlewares/authMiddleware";
import validation from '../../controllers/Validation';

const router = express.Router();

// router.use('/', verify, controller);

module.exports = router;