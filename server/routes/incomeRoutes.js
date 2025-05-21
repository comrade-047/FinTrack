import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} from "../controllers/incomeController.js";

const router = express.Router();

router.post('/add',protect,addIncome);
router.get('/get',protect,getAllIncome);
router.get('/download',protect,downloadIncomeExcel);
router.delete('/:id',protect,deleteIncome);

export default router;