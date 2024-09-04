import apiResponse from  "../helpers/apiResponse";

const callbackMiddleware = async (req, res, next) => {
    try {

        if (process.env.SIGNATURE_CALLBACK == req.query.signature) {
            next()
        } else {
            return apiResponse.dataNotFoundResponse(res, 'No Signature found')
        }

    } catch (error) {
        return next(error);
    }
}

module.exports = {
    callbackMiddleware
}