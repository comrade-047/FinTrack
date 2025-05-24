import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const IncomeList = ({ transactions, onDelete, onDownload }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg"> Income Sources</h5>
                <button 
                    className="card-btn"
                    onClick={onDownload}
                > 
                    <LuDownload className="text-base"/> Download
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {transactions?.map((item) => (
                    <TransactionInfoCard
                        key={item._id}
                        icon={item.icon}
                        title={item.source}
                        amount={item.amount}
                        date={moment(item.date).format("DD MMM YYYY")}
                        type="income"
                        onDelete={() => onDelete(item._id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default IncomeList;