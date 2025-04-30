import nodemailer from "nodemailer";


export async function EmailSend(EmailTo, EmailSubject, EmailText) {
        // Create transporter
        let transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false, // Must be false for port 587
            auth: {
                user: "aftaab2031@outlook.com",
                pass: "bpmbcsbmdmouioye"
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    
        
    
        let mailOptions = {
            from: `MERN Ecommerce Project <aftaab2031@outlook.com>`,
            to: EmailTo,
            subject : EmailSubject,
            text: EmailText
        };
    
    
        try {
            let info = await transporter.sendMail(mailOptions);
            return { status: "Success", data: info };
        } catch (err) {
            console.error("Error sending mail:", err);
            return { status: "Fail", data: err.message };
        }
    }