const auth = async (req, res, next) => {
    // console.log({session: req.session})
    if (req.session) {
        if (req.session.online == true) {
            next();
        }else if(!req.session.online){
            res.render('notfound')
            // res.render('notfound')
            // next();
        }
    } else {
        res.render('notfound')
    }
    
}

module.exports = auth