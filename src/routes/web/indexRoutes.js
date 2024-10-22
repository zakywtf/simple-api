import express from 'express';
import IndexController from '../../controllers/IndexController';
// import { verify } from "../../middlewares/authMiddleware";
import  auth  from "../../middlewares/auth";

const router = express.Router();

router.get('/', IndexController.loginPage);
router.get('/register', IndexController.registerPage);
router.get('/dashboard', auth, IndexController.dashboard)
router.get('/history', auth, IndexController.history)
router.get('/recommendation', auth, IndexController.recommendation)
router.get('/users', auth, IndexController.users)
router.get('/schools', auth, IndexController.schools)
router.get('/devices', auth, IndexController.devices)