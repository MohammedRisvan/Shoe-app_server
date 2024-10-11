import nodemailer from 'nodemailer';


export const SendMail=async (email:string,otp:string)=>{
    try{ 

        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.email,//Your Email
                pass:process.env.password,//email password
            }
        });
        //set up email data
        const mialOptions={
            from:process.env.email,
            to:email,
            subject:'YOUR OTP Number',
            html:`
          <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 10px;">
            <h2 style="color: #4CAF50;">Your OTP Code</h2>
            <p style="font-size: 16px;">Hello,</p>
            <p style="font-size: 16px;">Please use the following OTP code to complete your verification process. This code will expire in 10 minutes.</p>
            <div style="text-align: center; margin: 20px 0;">
              <span style="display: inline-block; font-size: 24px; background: #f9f9f9; border: 1px solid #ddd; padding: 10px 20px; border-radius: 5px;">
                ${otp}
              </span>
            </div>
            <p style="font-size: 14px; color: #555;">If you didn't request this, please ignore this email.</p>
            <p style="font-size: 14px; color: #555;">Thank you,</p>
            <p style="font-size: 14px; color: #555;">The Company Team</p>
          </div>
        `
        }
     
        await transporter.sendMail(mialOptions);
    }catch(err){
        console.log({message:"something wrong",err})
    }
}