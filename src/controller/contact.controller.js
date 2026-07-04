const SendEmailTo = require("../services/mailService");

const contact = async(req,res)=>{
  try {
    let {name,email,subject,message } = req.body;

   const htmlContent = `
      <h2>New  Message from MealBridge </h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Message:</b> ${message}</p>
    `;

  await SendEmailTo(
     process.env.EMAIL,
     subject,
     htmlContent
  );
//  ----------------------reply---------------
   const userReply = `
      <h2>Hi ${name} 👋</h2>
      <p>Thanks for contacting MealBridge.</p>
      <p>We’ve successfully received your message and our team is reviewing it.</p>
      <p>We’ll get back to you within <b>24–48 hours</b>.</p>
      <p>Regards,<br/>
      <b>MealBridge Team</b></p>
    `;

    await SendEmailTo(
      email,
      "Thanks for contacting us",
      userReply
    );

  res.status(200).json({
    message:"Email sent succesfully"
  });
  } catch (error) {
    res.status(500).json({
        message:"Email failed"
    });
  }
}

module.exports = contact