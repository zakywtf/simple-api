import express from 'express';
import IndexController from '../controllers/IndexController';
// import { verify } from "../../middlewares/authMiddleware";
import  auth  from "../middlewares/auth";

const router = express.Router();

// Routes Test
router.get('/ping', IndexController.ping);
router.get('/planner', IndexController.testPlanner);
router.get('/gemini', IndexController.testGemini);
router.get('/openai', IndexController.testOpenAi);
router.get('/imt', IndexController.testImt);
router.get('/rand-string', IndexController.randString);
router.get('/contact_us', IndexController.contactUs);
router.get('/email-test', IndexController.testSendEmail);
router.get('/text-json', IndexController.textToJson);


// Routes Prefixes / API
router.use('/api/v1', require('./api/index'));

// Routes Web
// router.use('/', require('./web/index'));
router.get('/', IndexController.loginPage);
router.get('/register', IndexController.registerPage);
router.get('/dashboard', auth, IndexController.dashboard)
router.get('/history', auth, IndexController.history)
router.get('/recommendation', auth, IndexController.recommendation)
router.get('/users', auth, IndexController.users)
router.get('/schools', auth, IndexController.schools)
router.get('/devices', auth, IndexController.devices)
router.get('/payment', auth, IndexController.payment)

module.exports = router;
