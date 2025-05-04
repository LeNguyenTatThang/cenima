import React, { createContext, useContext, useState } from "react"
import { Snackbar, Alert, AlertColor } from "@mui/material"

type SnackbarContextType = {
    showMessage: (message: string, severity?: AlertColor) => void
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined)

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState<AlertColor>("info")

    const showMessage = (msg: string, sev: AlertColor = "info") => {
        setMessage(msg)
        setSeverity(sev)
        setOpen(true)
    }

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") return
        setOpen(false)
    }

    return (
        <SnackbarContext.Provider value={{ showMessage }}>
            {children}
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    )
}

export const useSnackbar = (): SnackbarContextType => {
    const context = useContext(SnackbarContext)
    if (!context) {
        throw new Error("useSnackbar must be used within a SnackbarProvider")
    }

    return context
}
