import express from "express";
import { verify } from "../../middlewares/authMiddleware";

const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/users', require('./usersRoutes'));
router.use('/schools', require('./schoolsRoutes'));
router.use('/devices', require('./devicesRoutes'));
router.use('/histories', require('./historyRoutes'));
router.use('/check-up', require('./historyRoutes'));
router.use('/recommendations', require('./recommendationsRoutes'));
router.use('/payments', require('./paymentRoutes'));

module.exports = router;