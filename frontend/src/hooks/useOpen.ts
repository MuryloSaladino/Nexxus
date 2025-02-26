import { useState } from "react";

export interface IOpenHook { 
    open: boolean
    show: () => void
    hide: () => void
}

export default function useOpen(startOpen?: boolean): IOpenHook {

    const [open, setOpen] = useState(!!startOpen)

    const show = () => setOpen(true)
    const hide = () => setOpen(false)

    return { open, show, hide }
}