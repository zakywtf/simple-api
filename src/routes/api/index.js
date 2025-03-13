import express from "express";
import { verify } from "../../middlewares/authMiddleware";

const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/users', require('./usersRoutes'));
router.use('/dashboard', require('./indexRoutes'))
router.use('/partners', require('./partnerRoutes'))
router.use('/devices', require('./devicesRoutes'))

module.exports = router;