
const sendEmail= async (options)=>{
    const mailGenerator=new Mailgen({
        theme:"default",
        product:{
            name:"Attention User",
            link:"https://freewillprortal.com"
        }
    })
const emailTextual=mailGenerator.generatePlainText(options.mailgenContent)
 const emailHtml= mailGenerator.generate(options.mailgenContent)

const transporter= nodemailer.createTransport({
host:process.env.MAILTRAP_SMTP_HOST,
port:process.env.MAILTRAP_SMTP_PORT,
auth:{
    user: process.env.MAILTRAP_SMTP_USER,
    pass:process.env.MAILTRAP_SMTP_PASS
}
})
const mail={
    from:"mail.abcmanager@gxail.com",
    to:options.email,
    subject:options.subject,
    text: emailTextual,
    html:emailHtml
}

try{
    await transporter.sendMail(mail);
}
catch(err){
    console.error("Email service failed silently, make sure You have entered valid credentials")
    throw error;
}
const emailVerificationMailgenContent=(username, verificationUrl) => { 
    // username and verifiaaction  email given by user
return{
    body:{
        name: username,
        intro:" Welcome To Our App! we'r excited to have you on board",
        action: {
            instruction:
            "To verify your email pls click on the following button",
            button:{
                color: "rgb(45, 171, 121)",
                text : "Verify Your Email",
                link :verificationUrl,// whtever email u have given to me we will use it here
            },
        },

        outro:
        "Need help, or have any question regarding the information? Just reply to this email, we'd love to help."
    },
};

};



const forgotPasswordMailgenContent=(username, passwordResetUrl) =>{
return{
    body:{
        name: username,
        intro:" Fogeot Password? Here is how you proceed to reset ",
        action: {  
            instructions:
            "To Reset the password ! Click on the Button or link given Below",
            button:{
                color: "rgb(45, 171, 121)",
                text : "Reset Password",
                link :passwordResetUrl,
            },
        },

        outro:
        "Need help, or have any question regarding the information? Just reply to this email, we'd love to help."
    },
};

}


export {emailVerificationMailgenContent,forgotPasswordMailgenContent,sendEmail};
}