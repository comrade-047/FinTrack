import { useEffect, useState } from "react";

import {useUserAuth} from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import TransactionOverview from "../../components/Transactions/TransactionOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import TransactionList from "../../components/Transactions/TransactionList";

const Transactions = () => {
    useUserAuth();

    const [transactionData, setTransactionData] = useState([]);
    const [loading, setLoading] = useState(false);

    // get all transaction details
    const fetchTransactionDetails = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`); 
            if(response.data){
                setTransactionData(response.data);
            }
           
        } catch (error) {
            console.error("Error fetching transaction details", error);
        } finally {
            setLoading(false);
        }
    }

    // handle download transactions
    const handleDownloadTransactions = async () => {
        try {
            const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.DOWNLOAD_TRANSACTIONS_EXCEL}`, {
                responseType: 'blob', // Important for downloading files
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'transactions_details.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading transactions", error);
        }
    }

    useEffect(() => {
        fetchTransactionDetails();
        return () => {};
    }, []);

    return (
        <DashboardLayout activeMenu="Transactions">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <TransactionOverview
                            transactionData={transactionData?.recentTransactions || []}
                            // fetchTransactionDetails={fetchTransactionDetails}
                        />
                    </div>
                    <TransactionList
                        transactionData={transactionData?.recentTransactions || []}
                        onDownload={()=>handleDownloadTransactions()}
                    />
                </div>

            </div>
        </DashboardLayout>
    )
}

export default Transactions;