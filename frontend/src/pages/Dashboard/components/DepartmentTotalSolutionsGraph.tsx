import { DepartmentTotalSolutions } from "@/interfaces/insights.interface";
import api from "@/service/internal.services";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function DepartmentTotalSolutionsGraph() {
    
    const [series, setSeries] = useState<DepartmentTotalSolutions[]>([]);
    
    useEffect(() => {
        (async () => {
            const { data } = await api.get("/insights/department-total-solutions");
            setSeries(data);
        })()
    }, [])

    console.log(series)

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={series}>
                <XAxis dataKey="department"/>
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="solutions" fill="var(--primary-dark)" barSize={60}/>
            </BarChart>
        </ResponsiveContainer>
    )
}