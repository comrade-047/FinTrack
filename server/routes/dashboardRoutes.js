import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {getDashboardData} from "../controllers/dashboardController.js"
import {downloadTransactionsExcel} from "../controllers/dashboardController.js";

const router = express.Router();

router.get('/',protect,getDashboardData);
router.get('/download-transactions',protect,downloadTransactionsExcel);

export default router;