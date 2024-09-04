import { check } from 'express-validator';
import { sanitizeBody } from "express-validator";
import User from "../schemas/users";

exports.validate = (method) => {
    switch(method) {
        case 'register': {
            return [
                check('name').isLength({ min: 3 }).trim().withMessage('Name cannot be empty'),
                check('email').isEmail().normalizeEmail().withMessage('Email must be a valid email address.')
                    .custom((value) => {
                        return User.findOne({email : value}).then((user) => {
                            if (user) {
                                return Promise.reject("E-mail already in use");
                            }
                        });
                    })
            ]
        }
            
        case 'register-customer': {
            return [
                check('name').isLength({ min: 3 }).trim().withMessage('Name cannot be empty'),
                check('phone').isLength({ min: 3 }).trim().withMessage('Phone number cannot be empty'),
                // check('proof_of_payment').not().isEmpty().withMessage('Please upload proof of payment'),
                check('email').isEmail().normalizeEmail().withMessage('Email must be a valid email address.')                  
            ]
        }

        case 'forgot_password': {
            return [
                check('member_card_id').not().isEmpty().withMessage('Please enter Member Card ID')
                    .isInt().withMessage('Member Card ID must be numeric')
                    .custom((value) => {
                        return User.findOne({member_card_id : value}).then((user) => {
                            if (!user) {
                                return Promise.reject("Member Card ID not found");
                            }
                        });
                    })
            ]
        }

        case 'login': {
            return [
                // check('username').not().isEmpty().withMessage('Please enter Username'),
                check('password').not().isEmpty().isLength({ min: 6 }).withMessage('Min password length is 6')
            ]
        }

        case 'change_pass': {
            return [
                check('new_password').not().isEmpty().isLength({ min: 8 }).withMessage('Min password length is 8')
            ]
        }

    }
        
}