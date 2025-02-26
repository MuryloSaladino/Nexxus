import { ReactNode } from "react";
import { Modal as MuiModal } from "@mui/material";
import styles from "./styles.module.css"
import Icon from "../Icon";

interface IModalProps {
    open: boolean
    onClose: () => void
    children: ReactNode
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl"
}

/**
 * `Modal` component: A customizable modal dialog with optional content and size control.
 *
 * Props:
 * - `open` (boolean, required): Controls whether the modal is visible.
 * - `handleClose` (function, required): Callback function to close the modal. 
 *   Triggered when the background or close button is clicked.
 * - `children` (ReactNode, optional): Content to display inside the modal.
 * - `maxWidth` (string, optional): Defines the maximum width of the modal. Options are:
 *   - `"xs"`: Extra small.
 *   - `"sm"`: Small.
 *   - `"md"` (default): Medium.
 *   - `"lg"`: Large.
 *   - `"xl"`: Extra large.
 *
 * Example usage:
 * ```
 * import Modal from "./Modal";
 * 
 * function App() {
 *   const [isOpen, setIsOpen] = useState(false);
 *   
 *   return (
 *     <>
 *       <button onClick={() => setIsOpen(true)}>Open Modal</button>
 *       <Modal 
 *         open={isOpen} 
 *         handleClose={() => setIsOpen(false)} 
 *         maxWidth="sm"
 *       >
 *         <p>This is modal content</p>
 *       </Modal>
 *     </>
 *   );
 * }
 * ```
 *
 * Notes:
 * - Clicking outside the modal content or the close button triggers `handleClose`.
 */
export default function Modal({ 
    children,
    open,
    onClose,
    maxWidth = "md" 
}:IModalProps) {

    return (
        <MuiModal
            open={open}
            onClose={onClose}
        >
            <div className={`${styles.modal} ${styles[maxWidth]}`}>
                { children }
                
                <Icon
                    name="close" 
                    onClick={onClose}
                    className={styles.close_button}
                />
            </div>
        </MuiModal>
    )
}
