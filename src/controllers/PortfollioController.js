import { CreatePortfollioService, DeletePortfollioService, ReadPortfollioService, ShowPortfollioListService, UpdatePortfollioService } from "../services/PortfollioService.js";

export async function CreatePortfollio(req, res) {
    let result = await CreatePortfollioService(req);
    return res.status(200).json(result);
}
export async function ReadPortfollio(req, res) {
    let result = await ReadPortfollioService(req);
    return res.status(200).json(result);
}
export async function UpdatePortfollio(req, res) {
    let result = await UpdatePortfollioService(req);
    return res.status(200).json(result);
}
export async function DeletePortfollio(req, res) {
    let result = await DeletePortfollioService(req);
    return res.status(200).json(result);
}
export async function ShowPortfollioList(req, res) {
    let result = await ShowPortfollioListService(req);
    return res.status(200).json(result);
}