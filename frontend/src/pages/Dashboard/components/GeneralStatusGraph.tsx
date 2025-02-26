import { GeneralStatusInsight } from "@/interfaces/insights.interface";
import api from "@/service/internal.services";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ['var(--primary-main)', 'var(--secondary-main)', 'var(--info-main)', 'var(--error-main)'];

export default function GeneralStatusGraph() {

    const [statusData, setSeries] = useState<GeneralStatusInsight>();
    const series = statusData ? Object.keys(statusData).map(x => ({ name: x, value: statusData[x as keyof GeneralStatusInsight] })) : []

    useEffect(() => {
        (async () => {
            const { data } = await api.get("/insights/general-status");
            setSeries(data);
        })()
    }, [])

    console.log(series)

    return (
        <ResponsiveContainer width="100%" height={400}>
            {
                statusData ? 
                <PieChart width={400} height={400} >
                    <Pie
                        data={series}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label
                    >
                        {series.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip/>
                </PieChart>: <></>
            }
            
        </ResponsiveContainer>
    )
}