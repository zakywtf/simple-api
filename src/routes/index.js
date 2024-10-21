import express from 'express';
import IndexController from '../controllers/IndexController';
// import { verify } from "../../middlewares/authMiddleware";

const router = express.Router();

router.get('/', IndexController.loginPage);
router.get('/ping', IndexController.ping);
router.get('/planner', IndexController.testPlanner);
router.get('/gemini', IndexController.testGemini);
router.get('/openai', IndexController.testOpenAi);
router.get('/imt', IndexController.testImt);
router.get('/rand-string', IndexController.randString);
router.get('/contact_us', IndexController.contactUs);
router.get('/email-test', IndexController.testSendEmail);

router.get('/register', IndexController.registerPage);
router.get('/dashboard', IndexController.dashboard)
router.get('/history', IndexController.history)
router.get('/recommendation', IndexController.recommendation)
router.get('/users', IndexController.users)
router.get('/devices', IndexController.devices)
router.get('/schools', IndexController.schools)

// Routes Prefixes / API

router.use('/api/v1', require('./api/index'));

// Routes Web
// router.use('/web/v1', require('./web/index'));


module.exports = router;
