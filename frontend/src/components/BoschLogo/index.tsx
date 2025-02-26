import styles from "./styles.module.css"

interface IBoschLogoProps {
    size?: "small" | "medium" | "large"
    variant?: "red" | "black" | "white" | "icon"
}

/**
 * `BoschLogo` component: A reusable image component for displaying the Bosch logo.
 * Supports custom sizes and additional image properties.
 *
 * Props:
 * - `size` (string, optional): Defines the size of the logo. Options are: `"small"`, `"medium"` or `"large"`
 * - `className` (string, optional): Additional CSS class names for styling.
 * - Other props: All additional props supported by a native `<img>` element.
 *
 * Example usage:
 * ```
 * import BoschLogo from "./BoschLogo";
 *
 * // Default size (medium)
 * <BoschLogo />
 *
 * // Small size with additional styling
 * <BoschLogo size="small" className="custom-logo-class" />
 * ```
 *
 * Notes:
 * - The `src` for the image is pre-set to `/bosch_logo.png`.
 * - The `alt` text defaults to `"Bosch Logo"` but can be overridden using props.
 * - The `size` prop applies pre-defined styles from `styles.module.css`.
 */
export default function BoschLogo({ size = "medium", variant = "red" }: IBoschLogoProps) {
    return (
        <img 
            alt="Bosch Logo"
            src={`/images/logos/${variant}.svg`}
            className={`${styles[size]} ${styles.grow}`}
        />
    )
}


