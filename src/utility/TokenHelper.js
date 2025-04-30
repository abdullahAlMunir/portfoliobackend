import jwt from "jsonwebtoken";

export async function EncodeToken(email, user_id) {
    let KEY = "123-ABC-987-XYZ";
    let EXPIRE = {expiresIn: "24h"};
    let PAYLOAD = {email: email, user_id: user_id,
    }
    return jwt.sign(PAYLOAD, KEY, EXPIRE );
}

export async function DecodeToken(token) {
    try {
    let KEY = "123-ABC-987-XYZ";

    return jwt.verify(token, KEY);

    } catch (error) {
        return null;
    }
}