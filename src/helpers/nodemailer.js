import nodemailer from "nodemailer";
import { SMTP_EMAIL, SMTP_EMAIL_PASSWORD } from "../config.js";



const mailClient = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
        user: SMTP_EMAIL,
        pass: SMTP_EMAIL_PASSWORD,
    },
}); 


export default mailClient;