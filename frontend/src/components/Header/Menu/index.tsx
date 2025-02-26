import { MouseEventHandler } from "react";
import styles from "./styles.module.css"
import Icon from "@/components/Icon";
import Link from "@/components/Link";
import { Routes } from "@/constants/routes";
import Avatar from "@/components/Avatar";
import Text from "@/components/Text";

interface IMenuProps {
    open: boolean;
    handleClose: () => void;
}

export default ({ open, handleClose }:IMenuProps) => {

    const username = localStorage.getItem("@USERNAME") ?? "ROBERT";

    const handleModalClick:MouseEventHandler = (e) => {
        e.stopPropagation()
    }

    return (
        <div 
            className={`${styles.backdrop} ${open ? styles.backdrop_showing : styles.backdrop_closing}`}
            onClick={handleClose}
        >
            <div 
                className={`${styles.menu} ${open ? styles.menu_showing : styles.menu_closing}`}
                onClick={handleModalClick}
            >
                <Icon 
                    name="close"
                    size="lg"
                    className={styles.close_button}
                    onClick={handleClose}
                >X</Icon>

                <div className={styles.menu_top}>
                    <Avatar username={username} size="large"/>
                    <Text fontSize="xl3">{username}</Text>
                </div>

                <div className={styles.link_list}>
                    <div>
                        <Icon name="arrow_forward_ios"/>
                        <Link to={Routes.HOME}>Home</Link>
                    </div>
                    <div>
                        <Icon name="arrow_forward_ios"/>
                        <Link to={Routes.DASHBOARD}>Dashboard</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}