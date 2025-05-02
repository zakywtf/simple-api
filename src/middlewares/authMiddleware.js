import jwt from "jsonwebtoken";
import apiResponse from "../helpers/apiResponse";
import Users from "../schemas/users";

require("dotenv").config();

const secret = process.env.JWT_SECRET;
const jwtData = {
    expiresIn: process.env.JWT_TIMEOUT_DURATION,
};
const signerOption = {
	algorithms: ['HS256']
}

const signer = async (payload) => {
    // console.log({payload, secret, jwtData})
    const token = jwt.sign(payload, secret, jwtData);

    return token
}

const checkExpired = async (user_id, next) => {
    const user = await Users.findOne({ _id: user_id })
    var isExpired = (user.isExpired == true) ? true : false

    return isExpired
}

const verify = async (req, res, next) => {
    // console.log({req})
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return apiResponse.unauthorizedResponse(res, 'Token provied');

    jwt.verify(token, secret, signerOption, async (err, user) => {
        if (err) {
            return apiResponse.unauthorizedResponse(res, err.message);

        } else {
            req.user = user
            let payload = {
                _id: user._id,
                name: user.name,
                email: user.email,
                status: user.status,
            };
            req.token = await signer(payload)
            const isExpired = await checkExpired(user._id)
            if (isExpired == true) {
                next()
                // if (req.baseUrl == '/api/v1/transactions' || req.baseUrl == '/api/v1/users') {
                //     next()
                // } else {
                //     return apiResponse.suspendResponse(res, 'Paket membership sudah kadaluarsa. Silahkan perpanjang paket atau pilih ulang paket');
                // }
            } else {
                next()
            }
            // next()
        }
        
    }) 
    
}

const decode = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}

module.exports = { 
    signer, 
    verify,
    decode
}