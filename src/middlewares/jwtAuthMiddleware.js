import apiResponse from "../helpers/apiResponse"
import Users from "../schemas/users"

const isAdmin = async (req, res, next) => {
    let user = await Users.findById(req.user._id)
    
    if(user.role != 'admin') {
        return apiResponse.unauthorizedResponse(res, 'Unauthorized. Only admin is allowed');
    }

    next();
}

module.exports = {
    isAdmin
};