require("dotenv").config();
const nodemailer = require("nodemailer");

exports.mailSender = async(email, subject, body)=>{
    
    try
    {

        // first create a transport using createTransport function.
        let transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,               // this should be app password.
            }
        })

    

    const mailOptions = {
        from: "Study Notion",
        to: `${email}`,
        subject: `${subject}`,
        html:`${body}`
    }

    //now send the mail using sendMail function of Transport
    let info = await transport.sendMail(mailOptions);
    console.log("Mail response : ", info);
    return info;

    }catch(err)
    {
        console.log(err);
    }
}

