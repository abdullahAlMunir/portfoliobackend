import mongoose from "mongoose";
import { PortfollioModel } from "../models/PortfollioModel.js";



export async function CreatePortfollioService(req) {
    try {
        let user_id = req.headers.user_id;
        let reqBody = {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            codeLink: req.body.codeLink,
            liveLink: req.body.liveLink,
            userID: user_id
        };

        const result = await PortfollioModel.create(reqBody);
        console.log("Created portfolio:", result);

        return { 
            status: "Success", 
            message: "Portfolio Created Successfully.",
            data: result
        };
    } catch (error) {
        console.log("Error in CreatePortfollioService:", error);
        return { 
            status: "Fail", 
            message: "Something Went Wrong.", 
            error: error.message 
        };
    }
}
export async function ReadPortfollioService(req) {
    try {
        let ObjectID = mongoose.Types.ObjectId;
        const portfolioID = new ObjectID(req.params.id);
        console.log("Converted ObjectID :" , portfolioID);
        
        const portfolio = await PortfollioModel.findById(portfolioID);
        
        if (!portfolio) {
            return { 
                status: "Fail", message: "Portfolio not found", data : portfolioID };
        }

        return { 
            status: "Success", 
            message: "Portfolio Retrieved Successfully",
            data: portfolio
        };
    } catch (error) {
        return { status: "Fail", message: "Something Went Wrong.", error: error.message };
    }
}
export async function UpdatePortfollioService(req) {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        // const portfolios = await PortfollioModel.find().sort({ createdAt: -1 });

        let result = await PortfollioModel.updateOne({ userID: user_id }, { $set: reqBody }, { upsert: true });

        return { status: "Success", message: "Profile Saved Successfully.", data : result };
    } catch (error) {
        console.log(error);        
        return { status: "Fail", message: "Something Went Wrong.", error: error.message };
    }
}
export async function ShowPortfollioListService(req) {
    try {
        // let portfollioID = req.params.id;
        const portfolios = await PortfollioModel.find().sort({ createdAt: -1 });

        return { status: "Success", message: "Profile Saved Successfully.", data : portfolios };
    } catch (error) {
        console.log(error);        
        return { status: "Fail", message: "Something Went Wrong.", error: error.message };
    }
}
export async function DeletePortfollioService(req) {
    try {
        let portfolioID = req.headers.portfolioID;

        let result = await PortfollioModel.deleteOne({ portfolioID: portfolioID });

        return { status: "Success", message: "Portfollio deleted Successfully.", data : result };
    } catch (error) {
        return { status: "Fail", message: "Something Went Wrong.", error: error.message };
    }
}