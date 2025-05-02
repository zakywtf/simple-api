import express from 'express';
import IndexController from '../controllers/IndexController';
// import { verify } from "../../middlewares/authMiddleware";
import  auth  from "../middlewares/auth";

const router = express.Router();

// Routes Test
router.get('/ping', IndexController.ping);
router.get('/imt', IndexController.testImt);
router.get('/rand-string', IndexController.randString);
router.get('/contact_us', IndexController.contactUs);
router.get('/email-test', IndexController.testSendEmail);

// Routes Prefixes / API
router.use('/api/v1', require('./api/index'));

module.exports = router;
