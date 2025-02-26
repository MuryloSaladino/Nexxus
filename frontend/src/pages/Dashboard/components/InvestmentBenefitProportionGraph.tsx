import { InvestmentBenefitProportionByCategory } from "@/interfaces/insights.interface";
import api from "@/service/internal.services";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function InvestmentBenefitProportionGraph() {

    const [series, setSeries] = useState<InvestmentBenefitProportionByCategory[]>([]);

    useEffect(() => {
        (async () => {
            const { data } = await api.get("/insights/investment-benefit-proportion");
            setSeries(data);
        })()
    }, [])

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={series}>
                <XAxis dataKey="category"/>
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="proportion" fill="var(--primary-main)" barSize={60}/>
            </BarChart>
        </ResponsiveContainer>
    )
}