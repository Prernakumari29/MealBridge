const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASS
    }
})

const SendEmailTo = async(to , subject , html)=>{
    let options = {
        from:`"MealBridge" <${process.env.EMAIL}>`,
        to,
        subject,
        html
    }

    return await transport.sendMail(options)
}

module.exports = SendEmailTo;