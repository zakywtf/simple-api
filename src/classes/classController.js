import { Router }  from "express";
import apiResponse from "../helpers/apiResponse";
import { authModel } from "./authModel"
import handleRequest from "../helpers/handleRequest"

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
            if(req.query.commodity_id) body.commodity_id=req.query.commodity_id
            if(req.query.farmer_land_id) body.farmer_land_id=req.query.farmer_land_id
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
            return model.login(body);
        });
    })

    router.post('/register', async(req,res)=>{        
        handleRequest(req, res, async(body)=>{
            return model.register(body, req.useragent);
        });
    })


    return router;
}

module.exports = {
    controller:controller, 
    authController:authController
}