import express from "express";
import { verify } from "../../middlewares/authMiddleware";

const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/users', require('./usersRoutes'));
router.use('/authors', require('./authorRoutes'))
router.use('/books', require('./bookRoutes'))

module.exports = router;