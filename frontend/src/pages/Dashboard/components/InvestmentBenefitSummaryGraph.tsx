import { InvestmentBenefitSummary } from "@/interfaces/insights.interface";
import api from "@/service/internal.services";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function InvestmentBenefitSummaryGraph() {

    const [series, setSeries] = useState<InvestmentBenefitSummary>();

    useEffect(() => {
        (async () => {
            const { data } = await api.get("/insights/investment-benefit-summary");
            setSeries(data);
        })()
    }, [])

    return (
        <ResponsiveContainer width="100%" height={400}>
            {
                series ?
                <BarChart data={Object.keys(series).map(x => ({ name: x, value: series[x as keyof InvestmentBenefitSummary] }))}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="value" fill="var(--secondary-main)" barSize={60}/>
                </BarChart> : <></>
            }
        </ResponsiveContainer>
    )
}