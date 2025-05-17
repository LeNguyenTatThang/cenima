import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import React from "react"
interface CustomDialogProps {
    open: boolean
    title: string
    children: React.ReactNode
    onClose: () => void
    onSubmit: () => void
    cancelText?: string
    confirmText?: string
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl"
    fullWidth?: boolean
}
const CustomDialog: React.FC<CustomDialogProps> = ({
    open,
    title,
    children,
    onClose,
    onSubmit,
    cancelText = "Hủy",
    confirmText = "Xác nhận",
    maxWidth = "sm",
    fullWidth,
    ...rest
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            {...rest}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">{cancelText}</Button>
                <Button onClick={onSubmit} color="primary">{confirmText}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CustomDialog