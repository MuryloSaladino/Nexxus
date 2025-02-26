import { IFormInput } from "@/components/Form/types"
import styles from "./styles.module.css"
import Form from "@/components/Form"
import { z } from "zod"
import Text from "@/components/Text"
import internalAPI from "@/service/internal.services"
import { useNavigate } from "react-router-dom"
import useLoading from "@/hooks/useLoading"
import { Routes } from "@/constants/routes"
import Button from "@/components/Button"
import { populate } from "@/data/populate"

interface ILoginPayload {
    username: string
    password: string
}

export default function Login() {

    const navigate = useNavigate()
    const { loadCallback, loading } = useLoading(internalAPI.post)
    const { loading: popLoading, loadCallback: popLoadCallback } = useLoading(populate)

    const fields:IFormInput[] = [
        { fieldName: "username", label: "username", zodSchema: z.string() },
        { fieldName: "password", label: "password", required: true, type: "password" }
    ]

    const submit = async (payload:ILoginPayload) => {
        const { data, success, showMessage } = await loadCallback("/auth/login", payload)
        
        if(!success) {
            showMessage()
            return
        }
        
        localStorage.setItem("@TOKEN", data.token)
        localStorage.setItem("@USERNAME", data.username)
        navigate(Routes.HOME)
    }

    const handlePopClick = async () => {
        await popLoadCallback()
        navigate(Routes.HOME)
    }

    return(
        <div className={`${styles.background} ${popLoading ? "loading" : ""}`}>
            <div className={`${styles.container} ${loading ? "loading" : ""}`}>
                <Text fontSize="xl3" fontWeight="semibold" textAlign="center">KanBosch</Text>

                <Form
                    fields={fields}
                    onSubmit={submit}
                    submitText="login"
                />
            </div>

            <div>
                <Text>If you are testing this and want to populate the database, hit this button bellow!</Text>
                <Button onClick={handlePopClick}>Populate</Button>
            </div>
        </div>
    )
}