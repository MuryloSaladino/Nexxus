import { useState } from "react"
import Avatar from "../Avatar"
import BoschLogo from "../BoschLogo"
import Menu from "./Menu"
import styles from "./styles.module.css"
import Icon from "../Icon"
import { useNavigate } from "react-router-dom"
import Link from "../Link"
import { Routes } from "@/constants/routes"
import Text from "../Text"

interface IHeaderProps {

}

/**
 * `Header` component: Displays a Bosch logo, a user avatar, and a menu.
 *
 * Features:
 * - Bosch logo on the left.
 * - User avatar with a tooltip and click-to-open menu functionality.
 * - Menu toggles visibility based on the `menuOpen` state.
 *
 * Notes:
 * - Uses `BoschLogo` for branding and `Avatar` for user interaction.
 * - The `Menu` component is displayed when the user clicks the avatar.
 */
const Header = ({  }:IHeaderProps) => {

    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("@TOKEN");
        localStorage.removeItem("@USERNAME");
        navigate("/")
    } 

    return(
        <>
            <header className={styles.header}>
                <BoschLogo/>

                {
                    window.location.href.includes(Routes.HOME) ?
                    <Link to={Routes.DASHBOARD}><Text fontSize="lg">Dashboard</Text></Link> :
                    <Link to={Routes.HOME}><Text fontSize="lg">Home</Text></Link>
                }

                <nav>
                    <Avatar 
                        username={localStorage.getItem("@USERNAME") ?? "BOSCH"}
                        onClick={() => setMenuOpen(true)}
                    />

                    <Icon
                        name="logout"
                        size="lg"
                        onClick={() => handleLogout()}
                        className={styles.logout}
                    />
                </nav>
            </header>

            <Menu
                open={menuOpen}
                handleClose={() => setMenuOpen(false)}
            />
        </>
    )
}

export default Header
