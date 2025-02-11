import express from 'express';
import IndexController from '../controllers/IndexController';
// import { verify } from "../../middlewares/authMiddleware";
import  auth  from "../middlewares/auth";

const router = express.Router();

// Routes Test
router.get('/ping', IndexController.ping);
router.get('/planner', IndexController.testPlanner);
router.get('/gemini/:height/:weight', IndexController.testGemini);
router.get('/meal-planner/:cat', IndexController.mealPlanner);
router.get('/testing-gemini/', IndexController.testingGemini);
router.get('/openai', IndexController.testOpenAi);
router.get('/imt', IndexController.testImt);
router.get('/rand-string', IndexController.randString);
router.get('/contact_us', IndexController.contactUs);
router.get('/email-test', IndexController.testSendEmail);
router.get('/text-json', IndexController.textToJson);
router.get('/delete-duplicate-users', IndexController.deleteDuplicateUsers);


// Routes Prefixes / API
router.use('/api/v1', require('./api/index'));

// Routes Web
// router.use('/', require('./web/index'));
router.get('/', IndexController.loginPage);
router.get('/register', IndexController.registerPage);
router.get('/dashboard', auth, IndexController.dashboard)
router.get('/history', auth, IndexController.history)
router.get('/recommendation', auth, IndexController.recommendation)
router.get('/meals', auth, IndexController.meals)
router.get('/users', auth, IndexController.users)
router.get('/users/majority/update/:majority_id/:user_id', auth, IndexController.userMajorityUpdate)
router.get('/schools', auth, IndexController.schools)
router.post('/schools/update/:_id', auth, IndexController.schoolUpdate)
router.get('/schools/delete/:_id', auth, IndexController.schoolDelete)
router.get('/devices', auth, IndexController.devices)
router.post('/devices/update/:_id', auth, IndexController.deviceUpdate)
router.get('/devices/delete/:_id', auth, IndexController.deviceDelete)
router.get('/payments', auth, IndexController.payment)
router.get('/payments/invoice', auth, IndexController.invoice)
router.get('/profile', auth, IndexController.profile)
router.get('/majority', auth, IndexController.majority)
router.post('/majority/update/:_id', auth, IndexController.majorityUpdate)


module.exports = router;
