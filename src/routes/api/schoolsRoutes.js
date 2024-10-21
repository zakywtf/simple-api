import express from 'express'
import controller from '../../controllers/SchoolsController'
import {verify} from "../../middlewares/authMiddleware"

const router = express.Router();

router.use('/', verify, controller);

module.exports = router;