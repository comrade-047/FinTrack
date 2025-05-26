import { isValidObjectId, Types } from "mongoose";
import xlsx from "xlsx";

import Income from "../models/Income.js";
import Expense from "../models/Expense.js";

export const getDashboardData = async(req,res)=>{
    try{
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        const totalIncome = await Income.aggregate([
            {$match:{userId:userObjectId}},
            {$group: { _id:null, total: {$sum: "$amount"}}}
        ])

        // console.log("totalIncome",{totalIncome,userId:isValidObjectId(userId)});

        const totalExpense = await Expense.aggregate([
            {$match : {userId: userObjectId}},
            {$group: { _id:null, total:{ $sum: "$amount"}}}
        ]);

        // last 60Days income transaction
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date:{$gte: new Date(Date.now() - 60*24*60*60*1000)}
        }).sort({date:-1});

        // total income 
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum,transaction) => sum += transaction.amount,
            0
        )

        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date:{$gte: new Date(Date.now() - 30*24*60*60*1000)}
        }).sort({date:-1});

        const expenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum,transaction) => sum+=transaction.amount,
            0
        )

        // fetching last 5 transactions(income , expense)
        const lastTransactions = [
            ...((await Income.find({userId}).sort({date:-1}).limit(5)).map(
                (transaction) => ({
                    ...transaction.toObject(),
                    type:"income",
                })
            )),
            ...((await Expense.find({userId}).sort({date:-1}).limit(5)).map(
                (transaction) => ({
                    ...transaction.toObject(),
                    type:"expense",
                })
            ))
        ].sort((a,b) => b.date - a.date);

        res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpenses: totalExpense[0]?.total || 0,
            last30DaysExpenses:{
                total:expenseLast30Days,
                transactions:last30DaysExpenseTransactions,
            },
            last60DaysIncome:{
                total:incomeLast60Days,
                transactions:last60DaysIncomeTransactions,
            },
            recentTransactions:lastTransactions,
        })
    }
    catch(err){
        res.status(500).json({message:"Internal server error",error:err.message})
    }
};

// Function to download expense as excel

export const downloadTransactionsExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        if (income.length === 0 && expense.length === 0) {
            return res.status(404).json({ message: "No transactions found" });
        }

        const incomeData = income.map(item => ({
            type: "Income",
            source_or_category: item.source,
            amount: item.amount,
            date: item.date,
        }));

        const expenseData = expense.map(item => ({
            type: "Expense",
            source_or_category: item.category,
            amount: item.amount,
            date: item.date,
        }));

        // Combine all transactions
        const allTransactions = [...incomeData, ...expenseData];

        const wb = xlsx.utils.book_new();
        const wsAll = xlsx.utils.json_to_sheet(allTransactions);
        const wsIncome = xlsx.utils.json_to_sheet(incomeData);
        const wsExpense = xlsx.utils.json_to_sheet(expenseData);

        xlsx.utils.book_append_sheet(wb, wsAll, "All Transactions");
        if (incomeData.length > 0) xlsx.utils.book_append_sheet(wb, wsIncome, "Income");
        if (expenseData.length > 0) xlsx.utils.book_append_sheet(wb, wsExpense, "Expense");

        const fileName = "transactions_details.xlsx";
        xlsx.writeFile(wb, fileName);

        res.download(fileName, err => {
            if (err) {
                console.error("Download error:", err);
                res.status(500).send("Error downloading file");
            }
        });

    } catch (err) {
        console.error("Transaction export error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
