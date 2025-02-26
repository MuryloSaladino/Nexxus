import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./styles.module.css"
import variants from "./variants.module.css"
import Icon from "../Icon";

interface IButtonProps extends ComponentPropsWithoutRef<'button'> {
    variant?: "contained" | "outlined"
    iconName?: string
    size?: "sm" | "md" | "lg"
    fullwidth?: boolean
}

/**
 * `Button` component: A customizable button with support for different styles and native button properties.
 *
 * Props:
 * - `variant` (string, optional): Defines the button style. Options are:
 *   - `"contained"`: A solid, filled button (default).
 *   - `"outlined"`: A button with an outlined border.
 * - `iconName` (string, optional): Additional icon to the left of the button.
 * - Other props: Supports all additional props of a native `<button>` element.
 *
 * Example usage:
 * ```
 * import Button from "./Button";
 *
 * // Contained button
 * <Button variant="contained" onClick={() => console.log("Clicked!")}>
 *   Submit
 * </Button>
 *
 * // Outlined button with custom styles
 * <Button variant="outlined" className="custom-button-class">
 *   Cancel
 * </Button>
 */
const Button = forwardRef<HTMLButtonElement, IButtonProps>(
    ({ className, children, iconName, fullwidth, size = "md", variant = "contained", ...props}, ref) => (
        <button
            ref={ref}
            {...props}
            className={`${styles.common} ${variants[variant]} ${className} ${styles[size]} ${fullwidth ? styles.fullwidth : ""}`}
        >
            {iconName &&
                <Icon name={iconName} size={size}/>
            }

            { children }
        </button>
    )
)

export default Button
