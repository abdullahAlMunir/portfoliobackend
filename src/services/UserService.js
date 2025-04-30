import { EmailSend } from "../utility/EmailHelper.js";
import { EncodeToken } from "../utility/TokenHelper.js";
import { UserModel } from "../models/UserModel.js";

export async function UserOTPService(req) {

    try {
        let email = req.params.email;
        let code = Math.floor(100000 + Math.random() * 900000);
        let EmailText = `Your verification Code/OTP for login is : ${code}`;
        let EmailSubject = "Email Verification";

        await EmailSend(email, EmailText, EmailSubject);

        await UserModel.updateOne({ email: email }, { $set: { otp: code } }, { upsert: true });
        return { status: "Success", message: "OTP sent successfully", data: code };
    } catch (err) {
        return { status: "Fail", message: "Somthing Went Wrong" }.toString();
    }
}
export async function VerifyLoginService(req) {
    try {
        let email = req.params.email;
        let otp = req.params.otp;

        // 1) Count user with email and otp
        let total = await UserModel.find({ email: email, otp: otp }).countDocuments('total');

        if (total === 1) {
            // 2) Read user_id
            let user_id = await UserModel.find({ email: email, otp: otp }).select("_id");


            // 3) Generate token for user
            let token = await EncodeToken(email, user_id[0]["_id"].toString());
            console.log(token);

            // 4) Update OTP code to 0
            await UserModel.updateOne({ email: email }, { $set: { otp: "0" } });

            return { status: "Success", message: "Valid OTP", token: token };

        } else {
            return { status: "Fail", message: "Invalid OTP" };
        }

    } catch (error) {
        return { status: "Fail", message: "Invalid OTP", error: error.message };
    }
}