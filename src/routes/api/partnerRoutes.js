import express from 'express'
import controller from '../../controllers/PartnersController'
import {verify} from "../../middlewares/authMiddleware"

const router = express.Router();

router.use('/', verify, controller);

module.exports = router;