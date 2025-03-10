import express from "express";
import { verify } from "../../middlewares/authMiddleware";

const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/users', require('./usersRoutes'));
router.use('/stores', require('./storesRoutes'));
router.use('/materials', require('./materialsRoutes'));
router.use('/menus', require('./menusRoutes'));

router.use('/histories', require('./historyRoutes'));
router.use('/check-up', require('./historyRoutes'));
router.use('/recommendations', require('./recommendationsRoutes'));
router.use('/payments', require('./paymentRoutes'));
router.use('/majority', require('./majorityRoutes'));
router.use('/dashboard', require('./indexRoutes'))

module.exports = router;