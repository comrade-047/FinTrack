import  {useState} from "react";


import EmojiPickerPopup from "../EmojiPickerPopup";
import Input from "../Inputs/Input"

const AddExpenseForm = ({ onAddExpense }) => {

    const [expense, setExpense] = useState({
        category : "",
        amount : "",
        date : "",
        icon : "",
    });

    const handleChange = (key,value) => setExpense({...expense, [key]: value});

    return (
        <div>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelectEmoji={(emoji) => handleChange("icon", emoji)}
            />
            
            <Input
                value={expense.category}
                onChange={({target})=> handleChange("category", target.value)}
                label="Category"
                placeholder="Enter category"
                type="text"
            />

            <Input
                value={expense.amount}
                onChange={({target})=> handleChange("amount", target.value)}
                label="Amount"
                placeholder=""
                type="number"
            />

            <Input
                value={expense.date}
                onChange={({target})=> handleChange("date", target.value)}
                label="Date"
                placeholder="Enter date"
                type="date"
            />

            <div className="flex jsustify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={()=>onAddExpense(expense)}
                >
                    Add Expense
                </button>
            </div>
        </div>
    )
}

export default AddExpenseForm;