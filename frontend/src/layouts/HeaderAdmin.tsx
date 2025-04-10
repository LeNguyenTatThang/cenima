import {
    AppBar,
    Badge,
    Box,
    Button,
    IconButton,
    InputBase,
    Toolbar,
    Typography,
    alpha,
    styled,
    useTheme
} from '@mui/material'
import {
    Menu as MenuIcon,
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    CalendarMonth as CalendarIcon,
    ArrowBack as ArrowBackIcon,
    LightMode as LightModeIcon,
} from '@mui/icons-material'
import { Link } from 'react-router-dom'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.04),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.06),
    },
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: alpha(theme.palette.common.black, 0.4),
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '24ch',
        },
    },
}))

interface HeaderProps {
    open: boolean;
    toggleDrawer: () => void;
}

export default function HeaderAdmin({ open, toggleDrawer }: HeaderProps) {
    const theme = useTheme()
    const currentDate = new Date()
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                width: { sm: `calc(100% - ${open ? 240 : 0}px)` },
                ml: { sm: `${open ? 240 : 0}px` },
                zIndex: theme.zIndex.drawer + 1,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
            }}
        >
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            color: 'primary.main',
                            bgcolor: 'primary.light',
                            borderRadius: 1,
                            padding: '4px',
                            '&:hover': {
                                bgcolor: alpha(theme.palette.primary.light, 0.8),
                            }
                        }}
                    >
                        <ArrowBackIcon fontSize="small" />
                    </IconButton>

                    <Typography variant="body1" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                        Trở về giao diện chính
                    </Typography>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Tìm kiếm..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    <Button
                        startIcon={<CalendarIcon />}
                        variant="text"
                        color="inherit"
                        sx={{
                            bgcolor: 'background.default',
                            px: 2,
                            py: 1,
                            borderRadius: 1,
                            '&:hover': {
                                bgcolor: alpha(theme.palette.common.black, 0.05),
                            }
                        }}
                    >
                        {formattedDate}
                    </Button>

                    <IconButton
                        size="large"
                        color="inherit"
                        sx={{
                            bgcolor: 'background.default',
                            '&:hover': {
                                bgcolor: alpha(theme.palette.common.black, 0.05),
                            }
                        }}
                    >
                        <Badge badgeContent={1} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    <IconButton
                        size="large"
                        color="inherit"
                        sx={{
                            bgcolor: 'background.default',
                            '&:hover': {
                                bgcolor: alpha(theme.palette.common.black, 0.05),
                            }
                        }}
                    >
                        <LightModeIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
