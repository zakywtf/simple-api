import { Router }  from "express";
import apiResponse from "../helpers/apiResponse";
import { authModel } from "./authModel"
import handleRequest from "../helpers/handleRequest"
import { decode } from "../middlewares/authMiddleware";

function controller(model) {
    let router = Router();
    router.get('/', async (req, res, next) => {
        // console.log({user: req.user})
        handleRequest(req, res, async(body)=>{
            model.setUdata(req.user)
            return await model.getAll(req.query);
        });
    })
    
    router.get('/:id', async (req, res, next)=>{
        handleRequest(req, res, async(body)=>{
            model.setUdata(req.user)
            return await model.getById(req.params.id);
        });
    })
    
    router.post('/',async (req, res, next)=>{
        handleRequest(req, res, async(body)=>{
            // console.log({user: req.user})
            if (req.user) model.setUdata(req.user)
            return await model.insert(body);
        });
    })
    
    router.put('/update/:id', async (req, res, next) => {
        handleRequest(req, res, async(body)=>{
            model.setUdata(req.user)
            return await model.update({ id: req.params.id }, model.convertParam(body));
        });
    })

    router.delete('/delete/:id',async (req, res, next)=>{
        handleRequest(req, res, async(body)=>{
            model.setUdata(req.user)
            return await model.delete({ id: req.params.id });
        });
    })
    
    router.get('/pagination/:page/:perPage', async (req, res, next) => {
        handleRequest(req, res, async(body)=>{
            model.setUdata(req.user)
            const { page, perPage } = req.params;
            const { search, commodity_id, farmer_land_id } = req.query
            if ( search ) {
                const rgxVal = new RegExp(req.query.search, 'i');
                var qry = {
                    $or: [ 
                        { name: rgxVal }
                    ]
                };
            }
            const filter = (commodity_id) ? { commodity_id: commodity_id } : (farmer_land_id) ? { farmer_land_id: farmer_land_id } : {}
            const select = ''
            return await model.paging(perPage, (((page - 1) * perPage)), {...qry, ...filter, created_by: req.user._id}, { created_at: -1 }, select);
        });
        
    })

    return router;
}

function authController(aModel=false) {
    let router = Router();
    const model = aModel || new authModel();
    router.post('/login', async(req,res)=>{        
        handleRequest(req, res, async(body)=>{
            const user = await model.login(body);
            console.log({user})
            req.session.user_id = user.data._id;
            req.session.name = user.data.name;
            req.session.role = user.data.role;
            req.session.photo = user.data.photo;
            req.session.gender = user.data.gender;
            req.session.school_id = user.data.school_id;
            school_id: user.data.school_id,
            req.session.online = true;
            return user
        });
    })

    router.post('/register', async(req,res)=>{        
        handleRequest(req, res, async(body)=>{
            return model.register(body, req.useragent);
        });
    })

    router.post('/logout', async(req,res)=>{        
        handleRequest(req, res, async(body)=>{
            const token = req.headers['authorization']?.split(' ')[1];
            res.locals.udata = await decode(token)
            console.log({token, udata: res.locals.udata})
            return model.logout(req, res.locals.udata._id);
        });
    })


    return router;
}

module.exports = {
    controller:controller, 
    authController:authController
}