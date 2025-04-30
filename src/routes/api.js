import express from 'express';
import * as UserController from '../controllers/UserController.js';
import * as PortfollioController from '../controllers/PortfollioController.js'

import AuthVerification from '../middlewares/AuthVerification.js';

const router = express.Router();

// User routes/end-points
router.get("/RegisterUser/:email", UserController.RegisterUser)
router.get("/VerifyLogin/:email/:otp", UserController.VerifyLogin)

// Portfollio routes/end-points
router.post("/CreatePortfollio", AuthVerification, PortfollioController.CreatePortfollio)
router.get("/ReadPortfollio/:id",AuthVerification, PortfollioController.ReadPortfollio)
router.get("/ShowPortfollioList",AuthVerification, PortfollioController.ShowPortfollioList)
router.post("/UpdatePortfollio",AuthVerification, PortfollioController.UpdatePortfollio)
router.delete("/DeletePortfollio/:id",AuthVerification, PortfollioController.DeletePortfollio)

export default router;