import {useEffect, useState} from "react";

import {useUserAuth} from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import ExpenseList from "../../components/Expense/ExpenseList";
import Modal from "../../components/Modal";
import axiosInstance from "../../utils/axiosInstance";
import {API_PATHS} from "../../utils/apiPaths";
import {toast} from "react-hot-toast";
import DeleteAlert from "../../components/DeleteAlert";
const Expense = () => {

    useUserAuth();

    const [expenseData,setExpenseData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [openDeleteAlert,setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });
    const [openAddExpenseModal,setOpenAddExpenseModal] = useState(false);

    // get all Expense details
    const fetchExpenseDetails = async () => {
        if(loading) return;
        setLoading(true);

        try {
            const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);
            if(response.data){
                setExpenseData(response.data.expense);
            }
        } catch (error) {
            console.error("Error fetching expense details", error);
        } finally {
            setLoading(false);
        }
    };

    // handle add expense
    const handleAddExpense = async (expense) => {
        const { category, amount, date, icon } = expense;

        // validate expense data
        if(!category.trim()) {
            toast.error("category is required");
            return;
        } else if(!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount should be a valid number greater than 0");
            return;
        } else if(!date) {
            toast.error("Date is required");
            return;
        }

        try {
            await axiosInstance.post(`${API_PATHS.EXPENSE.ADD_EXPENSE}`, {
                category,
                amount,
                date,
                icon
            });

            setOpenAddExpenseModal(false);
            toast.success("Expense added successfully");
            fetchExpenseDetails();
            
        } catch (error) {
            console.error("Error adding expense", error);
            toast.error("An error occurred while adding the expense");
        }
    };
    // handle delete expense
    const handleDeleteExpense = async (id) => {
        console.log("id", id);
        try {
            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
            setOpenDeleteAlert({show:false, id: null});
            toast.success("Expense deleted successfully");
            fetchExpenseDetails();
        } catch (error) {
            console.error("Error deleting expense", error);
            toast.error("An error occurred while deleting the expense");
        }
    };

    useEffect(() => {
        fetchExpenseDetails();
        return () =>{}
    }
    , []);

    return (
        <DashboardLayout activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <ExpenseOverview
                            transactionData={expenseData}
                            onAddExpense = {() => setOpenAddExpenseModal(true)}
                        />
                    </div>
                    <ExpenseList
                        transactions={expenseData}
                        onDelete = {(id) => setOpenDeleteAlert({show:true, id})}
                        onDownload = {() => {}}
                    />
                </div>

                <Modal
                    isOpen={openAddExpenseModal}
                    onClose={() => setOpenAddExpenseModal(false)}
                    title="Add Expense"
                >
                    <AddExpenseForm onAddExpense = {handleAddExpense} />
                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({show:false, id: null})}
                    title="Delete Expense"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this expense?"
                        onDelete={() => handleDeleteExpense(openDeleteAlert.id)}
                    />
                </Modal>
            </div>
        </DashboardLayout>
    )
}

export default Expense;