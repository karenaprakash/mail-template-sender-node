 /**
     * auth : it authenticate admin
     */
    const  { Admin } = require('../models/admin');
    
    let auth = (req,res,next) =>{
        let token = req.cookies.auth;
        
        Admin.findByToken(token,(err,admin)=>{

            if (!admin) return res.json({
                error : true
            })
            
            req.token = token;
            req.admin = admin;

            next();
        })
        
    }

    
    module.exports = { auth }