import { forwardRef, JSX } from "react"
import f_styles from "./font-styles.module.css"
import f_weights from "./font-weights.module.css"
import f_sizes from "./font-sizes.module.css"
import t_aligns from "./text-align.module.css"

type TextVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p"
type TextWeight = "light" | "regular" | "semibold" | "bold" | "extrabold"
type TextFontSize = "xs" | "sm" | "md" | "lg" | "xl" | "xl2" | "xl3" | "xl4" | "xl5" | "inherit"
type TextStyle = "normal" | "itallic" 
type TextAlign = "center" | "end" | "justify" | "left" | "right" | "start" | "inherit"

type TextElementProps = JSX.IntrinsicElements[TextVariant];

type ITextProps = TextElementProps & {
    variant?: TextVariant
    fontWeight?: TextWeight
    fontSize?: TextFontSize
    fontStyle?: TextStyle
    textAlign?: TextAlign
}

const Text = forwardRef<HTMLElement, ITextProps>(
    ({ 
        variant: Variant = "span",
        fontWeight = "regular",
        fontSize = "inherit",
        fontStyle = "normal",
        textAlign = "inherit",
        children,
        className,
    }, ref) => (
        <Variant 
            ref={ref as any}
            className={`${f_styles[fontStyle]} ${f_sizes[fontSize]} ${f_weights[fontWeight]} ${t_aligns[textAlign]} ${className || ""}`}
            children={children}
        />
    ) 
)

export default Text
