const errorhandler = (err , req , res, next)=>{
    let message = err.message || "Internal server error"
    let statusCode = err.statusCode || 500

    return res.status(statusCode).json({
        message,
        success:false
    })
};

module.exports = errorhandler;