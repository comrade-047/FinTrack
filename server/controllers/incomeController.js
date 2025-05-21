import Income from "../models/Income.js"
import xlsx from "xlsx";

// Function to add income
export const addIncome = async(req,res) =>{
    const userId = req.user.id;
    // console.log(userId);
    try{
        const {icon, source, amount, date} = req.body;

        if(!source || !amount || !date){
            return res.status(400).json({message:"All fields required"});
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(201).json({newIncome});
    }catch(err){
        res.status(500).json({message:"Internal server Error"});
    }
};

// Function to get all income
export const getAllIncome = async(req,res) => {
    const userId = req.user.id;
    try{
        const income = await Income.find({userId}).sort({date:-1});
        res.status(200).json({income});
    }catch(err){
        res.status(500).json({message:"Internal server Error"});
    }
};

// Function to download income as excel
export const downloadIncomeExcel = async(req,res) => {
    const userId = req.user.id;
    try{
        const income = await Income.find({userId}).sort({date:-1});
        if(income.length === 0){
            return res.status(404).json({message:"No income found"});
        }
        const data = income.map((item) => ({
            source: item.source,
            amount: item.amount,
            date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "income_details.xlsx");
        res.download("income_details.xlsx", (err) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error downloading file");
            }
        });
    }catch(err){
        res.status(500).json({message:"Internal server Error"});
    }
};

// Function to delete income
export const deleteIncome = async(req,res) =>{
    const userId = req.user.id;
    const {id} = req.params;

    try{
        const income = await Income.findById(id);
        if(!income){
            return res.status(404).json({message:"Income not found"});
        }
        if(income.userId.toString() !== userId){
            return res.status(401).json({message:"Not authorized"});
        }
        await Income.findByIdAndDelete(id);
        res.status(200).json({message:"Income deleted successfully"});
    }catch(err){
        res.status(500).json({message:"Internal server Error",error: err.message});
    }
};

