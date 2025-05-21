import { isValidObjectId, Types } from "mongoose";

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

        console.log("totalIncome",{totalIncome,userId:isValidObjectId(userId)});

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
            totalExpense: totalExpense[0]?.total || 0,
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

// have to recheck the code