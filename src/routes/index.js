import express from 'express';
import IndexController from '../controllers/IndexController';
// import { verify } from "../../middlewares/authMiddleware";
import  auth  from "../middlewares/auth";

const router = express.Router();

router.get('/ping', IndexController.ping);
router.get('/planner', IndexController.testPlanner);
router.get('/gemini', IndexController.testGemini);
router.get('/openai', IndexController.testOpenAi);
router.get('/imt', IndexController.testImt);
router.get('/rand-string', IndexController.randString);
router.get('/contact_us', IndexController.contactUs);
router.get('/email-test', IndexController.testSendEmail);


// Routes Prefixes / API

router.use('/api/v1', require('./api/index'));

// Routes Web
// router.use('/', require('./web/index'));
router.get('/', IndexController.loginPage);
router.get('/register', IndexController.registerPage);
router.get('/dashboard', auth, IndexController.dashboard)
// router.get('/history', IndexController.history)
// router.get('/recommendation', IndexController.recommendation)
// router.get('/users', IndexController.users)
// router.get('/devices', IndexController.devices)
// router.get('/schools', IndexController.schools)

module.exports = router;
