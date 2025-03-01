import {
    createPortfolio,
    getPortfoliosByUser,
    updatePortfolio,
    deletePortfolio,
  } from '../services/portfolioService.js';
  
export async function createPortfolioHandler(req, res) {
    const result = await createPortfolio({ ...req.body, userID: req.userID });
    return res.status(result.status === 'Success' ? 200 : 400).json(result);
}
  
export async function getAllPortfolioHandler(req, res) {
    const result = await getPortfoliosByUser(req.userID);
    return res.status(result.status === 'Success' ? 200 : 400).json(result);
}
  
export async function updatePortfolioHandler(req, res) {
    const result = await updatePortfolio(req.params.portfolioID, req.body);
    return res.status(result.status === 'Success' ? 200 : 400).json(result);
}
  
export async function removePortfolioHandler(req, res) {
    const result = await deletePortfolio(req.params.portfolioID);
    return res.status(result.status === 'Success' ? 200 : 400).json(result);
}