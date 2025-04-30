import { 
    UserOTPService, 
    VerifyLoginService } from "../services/UserService.js";

export async function RegisterUser(req, res) {
    let result = await UserOTPService(req);
    return res.status(200).json(result);
}
export async function VerifyLogin(req, res) {
    let result = await VerifyLoginService(req);

    if (result["status"] === "Success") {

        // Set Cookie Option
        let CookieOption = {expires: new Date(Date.now() + 24 * 6060 * 1000), httpOnly: false};

        // Set Cookie with Response  

        res.cookie("token", result["token"], CookieOption);

        return res.status(200).json(result);
    } else {
    return res.status(200).json(result);
    }   
}