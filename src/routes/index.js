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

// Routes Web
// router.use('/', require('./web/index'));
router.get('/', IndexController.loginPage);
router.get('/register', IndexController.registerPage);
router.get('/dashboard', auth, IndexController.dashboard)
// router.get('/history', auth, IndexController.history)
// router.get('/recommendation', auth, IndexController.recommendation)
// router.get('/meals', auth, IndexController.meals)

// router.get('/users', auth, IndexController.users)
// router.get('/users/history', auth, IndexController.userHistory)
// router.get('/users/level', auth, IndexController.usersLevel)
// router.get('/users/bmi-category', auth, IndexController.usersCategoryBMI)
// router.get('/users/majority/update/:majority_id/:user_id', auth, IndexController.userMajorityUpdate)

router.get('/stores', auth, IndexController.stores)
router.post('/stores/update/:_id', auth, IndexController.storeUpdate)
router.get('/stores/delete/:_id', auth, IndexController.storeDelete)

router.get('/owners', auth, IndexController.owners)
router.post('/owners/update/:_id', auth, IndexController.ownerUpdate)
router.get('/owners/delete/:_id', auth, IndexController.ownerDelete)

router.get('/cashiers', auth, IndexController.cashiers)
router.post('/cashiers/update/:_id', auth, IndexController.cashierUpdate)
router.get('/cashiers/delete/:_id', auth, IndexController.cashierDelete)

router.get('/materials', auth, IndexController.materials)
router.post('/materials/update/:_id', auth, IndexController.materialUpdate)
router.get('/materials/delete/:_id', auth, IndexController.materialDelete)
// router.get('/payments', auth, IndexController.payment)
// router.get('/payments/invoice', auth, IndexController.invoice)

// router.get('/profile', auth, IndexController.profile)

// router.get('/majority', auth, IndexController.majority)
// router.post('/majority/update/:_id', auth, IndexController.majorityUpdate)


module.exports = router;
