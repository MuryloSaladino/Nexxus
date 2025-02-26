import useLoading from "@/hooks/useLoading";
import { SummarizedSolution } from "@/interfaces/solutions.interfaces";
import api from "@/service/internal.services";
import { useEffect, useState } from "react";

export default function useSolutions() {

    const [solutions, setSolutions] = useState<SummarizedSolution[]>([]);
    const { loading, loadCallback } = useLoading(api.get);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        updateSolutions()
    }, [page, search])
    
    const updateSolutions = async () => {
        const { data } = await loadCallback(`/solutions?page=${page}&size=10&name=${search}`);
        setSolutions(data.data);
        setMaxPage(data.totalPages)
    }

    const handleSetSearch = (search: string) => setSearch(search);
    const handleSetPage = (page: number) => setPage(page);

    return {
        solutions,
        loading,
        search,
        handleSetSearch,
        handleSetPage,
        updateSolutions,
        maxPage,
        page,
    }
}