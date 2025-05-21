import xlsx from 'xlsx';

import Expense from '../models/Expense.js';

// Function to add expense
export const addExpense = async(req,res) =>{

    const userId = req.user.id;
    try{
        const {icon, category, amount, date} = req.body;

        if(!category || !amount || !date){
            return res.status(400).json({message:"All fields required"});
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(201).json({newExpense});
    }catch(err){
        res.status(500).json({message:"Internal server Error"});
        console.log(err);
    }
};

// Function to get all expense
export const getAllExpense = async(req,res) => {
    const userId = req.user.id;
    try{
        const expense = await Expense.find({userId}).sort({date:-1});
        res.status(200).json({expense});
    }catch(err){
        res.status(500).json({message:"Internal server Error"});
    }
};

// Function to download expense as excel
export const downloadExpenseExcel = async(req,res) => {
    const userId = req.user.id;
    try{
        const expense = await Expense.find({userId}).sort({date:-1});
        if(expense.length === 0){
            return res.status(404).json({message:"No income found"});
        }
        const data = expense.map((item) => ({
            category: item.category,
            amount: item.amount,
            date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, "expense_details.xlsx");
        res.download("expense_details.xlsx", (err) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error downloading file");
            }
        });
    }catch(err){
        res.status(500).json({message:"Internal server Error"});
    }
};

// Function to delete expense
export const deleteExpense = async(req,res) =>{
    const userId = req.user.id;
    const {id} = req.params;

    try{
        const expense = await Expense.findById(id);
        if(!expense){
            return res.status(404).json({message:"Expense not found"});
        }
        if(expense.userId.toString() !== userId){
            return res.status(401).json({message:"Not authorized"});
        }
        await Expense.findByIdAndDelete(id);
        res.status(200).json({message:"Expense deleted successfully"});
    }catch(err){
        res.status(500).json({message:"Internal server Error",error: err.message});
    }
};

