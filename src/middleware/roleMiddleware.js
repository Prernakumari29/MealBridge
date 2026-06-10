const apiError = require("../utils/apiError")

const authrorizerole = (...roles)=>{
    return (req , res , next)=>{
        if(!roles.include(req.user.role)){
            throw new apiError(403 , "access denied")
        }
        next();

    }

}

module.exports = authrorizerole;