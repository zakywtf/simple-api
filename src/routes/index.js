import express from 'express';
import IndexController from '../controllers/IndexController';
// import { verify } from "../../middlewares/authMiddleware";

const router = express.Router();

router.get('/', IndexController.index);
router.get('/ping', IndexController.ping);
router.get('/rand-string', IndexController.randString);
router.get('/contact_us', IndexController.contactUs);
router.get('/email-test', IndexController.testSendEmail);

// Routes Prefixes / API

router.use('/api/v1', require('./api/index'));

// Routes Web
// router.use('/web/v1', require('./web/index'));


module.exports = router;
