import { useState, useEffect } from "react";

import CustomBarChart from "../Charts/CustomBarChart";
import { prepareTransactionBarChartData } from "../../utils/helper";

const TransactionOverview = ({ transactionData }) => {
    
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        const result  = prepareTransactionBarChartData(transactionData);
        setChartData(result);
    }, [transactionData]);

    return (
        <div className="card">
            <div className="flex flex-col justify-start ">
                <h5 className="text-lg">Transactions Overview</h5>
                <p className="text-xs text-gray-400 mt-0.5">Look over your recent transactions</p>
            </div>
            <div className="mt-10">
                <CustomBarChart data={chartData} />
            </div>
        </div>
    )
}

export default TransactionOverview;
