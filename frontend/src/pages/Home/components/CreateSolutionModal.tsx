import Form from "@/components/Form";
import { IFormInput } from "@/components/Form/types";
import Modal from "@/components/Modal";
import useLoading from "@/hooks/useLoading";
import { User } from "@/interfaces/user.interfaces";
import api from "@/service/internal.services";
import { useEffect, useState } from "react";
import { z } from "zod";
import styles from "../styles.module.css"
import { categoryTypes, priorityTypes, SolutionCreation, statusTypes } from "@/interfaces/solutions.interfaces";
import { toast } from "react-toastify";
import Text from "@/components/Text";

interface ICreateSolutionModalProps {
    open: boolean;
    onClose: () => void;
}

export default function CreateSolutionModal({
    open,
    onClose,
}: ICreateSolutionModalProps) {

    const { loadCallback, loading } = useLoading(api.post);
    const [users, setUsers] = useState<User[]>([]);

    const userOptions = [...users.map(u => ({ value: u.id, label: u.username }))]
    const statusOptions = statusTypes.map(s => ({ value: s, label: s }))
    const categoryOptions = categoryTypes.map(s => ({ value: s, label: s }))
    const priorityOptions = priorityTypes.map(s => ({ value: s, label: s }))

    useEffect(() => {
        (async () => {
            const response = await api.get("/users");
            setUsers(response.data.data)
        })()
    }, [])

    const fields: IFormInput[] = [
        { fieldName: "userInChargeId", label: "User", type: "select", options: userOptions },
        { fieldName: "name", label: "Name", required: true, zodSchema: z.string().min(3).max(50) },
        { fieldName: "clientDepartment", label: "Department", required: true, zodSchema: z.string().min(3).max(50) },
        { fieldName: "benefit", label: "Benefit", required: true },
        { fieldName: "investment", label: "Investment", required: true },
        { fieldName: "status", label: "Status", required: true, type: "select", options: statusOptions },
        { fieldName: "category", label: "Status", required: true, type: "select", options: categoryOptions },
        { fieldName: "priority", label: "Status", required: true, type: "select", options: priorityOptions },
    ]

    const submit = async (payload: SolutionCreation) => {
        const { success, showMessage } = await loadCallback("/solutions", {
            ...payload,
            description: "",
            justification: "",
            orchestration: "",
            investment: Number(payload.investment),
            benefit: Number(payload.benefit),
        });

        if(success) {
            toast.success("Solution Created!");
            onClose();
        } else {
            showMessage();
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            maxWidth="sm"
        >
            <div className={`${loading ? "loading" : ""} ${styles.modal_content}`}>
                <Text fontSize="xl2">Create new Use Case</Text>
                <Form
                    fields={fields}
                    onSubmit={submit}
                    submitText="Save"
                />
            </div>
        </Modal>
    )
}