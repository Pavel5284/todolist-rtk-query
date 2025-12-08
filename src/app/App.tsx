import style from "./App.module.css"
import { selectThemeMode, setIsLoggedInAC } from "@/app/app-slice"
import { ErrorSnackbar, Header } from "@/common/components"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { Routing } from "@/common/routing/Routing.tsx"
import { useEffect, useState } from "react"
import { CircularProgress } from "@mui/material"
import { useMeQuery } from "@/features/auth/api/authApi.ts"
import { ResultCode } from "@/common/enums"

export const App = () => {
  const [isInitialized, setIsInitialized] = useState(false)

  const { data, isLoading } = useMeQuery()

  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  useEffect(() => {
    if (isLoading) return
    if (data?.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedInAC({ isLoggedIn: true }))
    }
    setIsInitialized(true)
  }, [isLoading])

  if (!isInitialized) {
    return (
      <div className={style.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={style.app}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
