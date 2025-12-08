import Button from "@mui/material/Button/Button"
import styles from "./PageNotFound.module.css"
import { Link } from "react-router"

export const PageNotFound = () => (
  <>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <Button component={Link} to="/">
      Go to Main Page
    </Button>
  </>
)
