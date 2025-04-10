import { useState } from 'react'
import { Box, CssBaseline, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import Sidebar from './SidebarAdmin'
import Header from './HeaderAdmin'

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <CssBaseline />
            <Header open={!isMobile || mobileOpen} toggleDrawer={handleDrawerToggle} />
            <Sidebar open={mobileOpen} onClose={handleDrawerToggle} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${240}px)` },
                    bgcolor: 'background.default',
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    )
}
