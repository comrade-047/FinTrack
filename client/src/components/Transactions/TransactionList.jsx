import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const TransactionList = ({ transactionData, onDownload }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg"> Transactions</h5>
                <button 
                    className="card-btn"
                    onClick={onDownload}
                > 
                    <LuDownload className="text-base"/> Download
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {transactionData?.map((item) => (
                    <TransactionInfoCard
                        key={item._id}
                        icon={item.icon}
                        title={item.source}
                        amount={item.amount}
                        date={moment(item.date).format("DD MMM YYYY")}
                        type={item.type}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    )
}

export default TransactionList;