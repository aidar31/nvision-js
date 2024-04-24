import mailClient from "../helpers/nodemailer.js";



class MailerRepository {
    static async sendEmailTo(to, data) {
        const mail = mailClient.sendMail({
            from: "aidaisenov31@gmailcom",
            to: to,
            subject: "NovelVision Activation Account",
            text: `activation link: https://8e84-2-133-130-122.ngrok-free.app/api/auth/confirmation/${data}`
        }, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                return info.response
            }
        });
    }
}


export default MailerRepository;


