const { registerService } = require("../services/authService");

const registerController = async(req,res)=>{

    let {name , email , password , mobile , role } = await registerService(req.body) 

}
module.exports = {registerController};