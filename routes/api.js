import express from 'express';
import * as portfolioController from "../controllers/portfolioController.js";

import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

// Portfolio routes/endpoints

router.post('/createPortfolio', AuthMiddleware, portfolioController.createPortfolioHandler)

router.get('/getPortfolio', AuthMiddleware, portfolioController.getAllPortfolioHandler)

router.put('/updatePortfolio:id', AuthMiddleware, portfolioController.updatePortfolioHandler)

router.delete('/removePortfolio:id', AuthMiddleware, portfolioController.removePortfolioHandler)

export default router;