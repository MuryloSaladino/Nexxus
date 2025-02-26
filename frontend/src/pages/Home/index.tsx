import Header from "@/components/Header";
import useSolutions from "./hooks/useSolutions.hook";
import styles from "./styles.module.css"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Text from "@/components/Text";
import { Pagination } from "@mui/material";
import Icon from "@/components/Icon";
import { Routes } from "@/constants/routes";
import { useNavigate } from "react-router-dom";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useState } from "react";
import CreateSolutionModal from "./components/CreateSolutionModal";

export default function Home() {

    const navigate = useNavigate()
    const {
        solutions,
        loading,
        handleSetSearch,
        maxPage,
        search,
        updateSolutions,
        page,
        handleSetPage
    } = useSolutions();
    
    const [open, setOpen] = useState(false);
    
    const handleClose = () => {
        updateSolutions();
        setOpen(false);
    }
    const handleOpen = () => setOpen(true)

    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", sortable: true, width: 120 },
        { field: "clientDepartment", headerName: "Department", width: 120 },
        { 
            field: "userInChargeUsername", 
            headerName: "Responsible", 
            valueGetter: (_, row) => row.userInCharge?.username || "None",
            width: 120
        },
        { field: "category", headerName: "Category", width: 150 },
        { field: "status", headerName: "Status", width: 100 },
        { 
            field: "impact", 
            headerName: "Impact", 
            valueGetter: (_, row) => new Intl.NumberFormat("en-US", {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
            }).format(Number((row.benefit - row.investment))),
            width: 150
        },
        { field: "priority", headerName: "Priority", width: 120 },
        { 
            field: "details", 
            headerName: "",
            renderCell: () => <Icon name="arrow_forward_ios"/>,
            width: 20,
            sortable: false,
            filterable: false,
        }
    ];

    return(
        <>
            <CreateSolutionModal
                open={open}
                onClose={handleClose}
            />

            <Header/>

            <div className={styles.container}>
                <div className={styles.data_navigation}>
                    <Text fontSize="xl2" fontWeight="bold">Use Cases</Text>
                    
                    <div>
                        <Input 
                            iconName="search"
                            value={search}
                            onChange={(e) => handleSetSearch(e.target.value)}
                        />
                        
                        <Button
                            iconName="add"
                            onClick={handleOpen}
                        >Create Solution</Button>
                    </div>
                </div>

                <DataGrid
                    columns={columns}
                    rows={solutions}
                    loading={loading}
                    hideFooterPagination
                    sx={{
                        '& .MuiDataGrid-row': {
                            transition: "0.15s",
                            cursor: "pointer"
                        },
                        '& .MuiDataGrid-row:hover': {
                            bgcolor: 'var(--primary-light)',
                        },
                    }}
                    onCellClick={(r) => navigate(Routes.SOLUTION_DETAILS.params({ id: r.row.id }))}
                    className={styles.data_grid}
                />

                <Pagination
                    count={maxPage}
                    page={page}
                    onChange={(_, page) => handleSetPage(page)}
                />
            </div>
        </>
    )
}