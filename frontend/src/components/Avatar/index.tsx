import styles from "./styles.module.css"
import Text from "../Text"
import { MouseEventHandler } from "react"

interface IAvatarProps {
    src?: string
    username: string
    size?: "small" | "medium" | "large"
    onClick?: MouseEventHandler<HTMLDivElement>
}

export default function Avatar({ src, onClick, size = "medium", username = "user" }: IAvatarProps) { 
    return (
        <div className={`${styles[size]} ${styles.avatar_container} ${onClick ? styles.clickable : ""}`} onClick={onClick}>
            {src ?
                <img 
                    alt={username || "Avatar"}
                    className={styles.avatar}
                    src={src}
                /> 
                : 
                <div className={styles.avatar}>
                    <Text>{ username.abreviate() }</Text>
                </div>
            }

            {username &&
                <span className={styles.tooltip}>
                    { username }
                </span>
            }
        </div>
    )
}
