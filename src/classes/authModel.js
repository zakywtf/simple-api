import Models from "./classModel";
import { ValidationError, NotFoundError, ServerError, UnauthorizedError } from "./classRespons"
import sch from "../schemas/users";
import { signer } from "../middlewares/authMiddleware";
import { deserializeUser } from "passport";
import bcrypt from "bcryptjs";
import moment from "moment-timezone";
import { addUserCommodity } from "../helpers/masterFunction"

class authModel extends Models{
    constructor(){
        super(sch)
    }

    async login(body) {
        // console.log({body})
        let user = await this.model.findOne({username: body.username})
        console.log({user})
        if (!user) throw new NotFoundError('Username Not Found')
        // if (user.status == 'unpaid') throw new NotFoundError('User is Unpaid')
        if (user.status == 'suspend') throw new NotFoundError('Your Account is Unpaid')
        // if (user.status == 'registered') throw new NotFoundError('Paid to Activated User')
        
        var payload = {
            _id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            last_login: user.last_login,
            total_login: user.total_login,
            membership: user.membership,
            isExpired: user.isExpired
        }
        // console.log({payload})
        const isMatch = await bcrypt.compare(body.password + process.env.SALT, user.password)
        if (!isMatch) throw new ValidationError('Incorect Password!')

        const token = await signer(payload)
        payload.token = token

        user.total_login += 1
        user.last_login = moment()
        await user.save()

        return { msg: 'Login Success.', data:payload }

    }

}

module.exports=authModel