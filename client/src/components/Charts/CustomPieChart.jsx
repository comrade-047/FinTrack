import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

import customTooltip from "./CustomTooltip";
import customLegend from "./CustomLegend";

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
    return (
        <ResponsiveContainer>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={100}
                    labelLine={false}
                >
                    {data.map((entry,index)=>(
                        <Cell key={`cell-${index}`} fill={colors[index%colors.length]}/>
                    ))}
                </Pie>
                <Tooltip content={customTooltip} />
                <Legend content={customLegend}/>
                {showTextAnchor && (
                    <>
                        <text
                            x="50%"
                            y="50%"
                            dy={-25}
                            textAnchor="middle"
                            fontSize="14px"
                            fill="#666"
                        >
                            {label}
                        </text>
                        <text
                            x="50%"
                            y="50%"
                            dy={8}
                            textAnchor="middle"
                            fontSize="24px"
                            fontWeight="semi-bold"
                            fill="#333"
                        >
                            {totalAmount}   
                        </text>
                    </>
                )}
            </PieChart>
        </ResponsiveContainer>
    );
}

export default CustomPieChart;