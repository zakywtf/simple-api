import path from 'path';
const handleRequest = async (req, res, callback, getStatusCode=false, message=false) =>{
    // let m = new model()
    let jres = {
        status:200,
        message:'',
        data:[]
    }
    try {
        const cb = await callback(req.body)
        jres.message = cb.msg
        jres.data = cb.data        
    } catch (error) {
        // console.log({error})
        const root=path.join(__dirname , '../../')
        // jres.status=(getStatusCode && getStatusCode()) || 404
        jres.status=(error.code) ? error.code : 500
        jres.message=error.message
        jres.data=error.name
    }
    res.json(jres)
} 

module.exports = handleRequest