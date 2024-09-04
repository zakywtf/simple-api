import express from 'express'
import controller from '../../controllers/AuthController'
import {verify} from "../../middlewares/authMiddleware"

const router = express.Router();

router.use('/', controller);

module.exports = router;