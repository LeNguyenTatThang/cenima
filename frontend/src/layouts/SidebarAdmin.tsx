import { useState } from 'react'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Avatar,
  IconButton,
  styled,
} from '@mui/material'
import {
  Home as HomeIcon,
  BarChart as AnalyticsIcon,
  People as ClientsIcon,
  Assignment as TasksIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const drawerWidth = 240

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}))

interface SidebarProps {
  open: boolean;
  onClose: () => void
  window?: () => Window
}

export default function Sidebar({ open, onClose, window }: SidebarProps) {
  const [selectedItem, setSelectedItem] = useState<string>('home')
  const href = useNavigate()
  const handleListItemClick = (itemId: string) => {
    setSelectedItem(itemId)
    href(`/dashboard/${itemId}`)
  }

  const container = window !== undefined ? () => window().document.body : undefined

  const mainListItems = [
    { id: '', text: 'Trang chủ', icon: <HomeIcon /> },
    { id: 'theater', text: 'Quản lý phòng chiếu', icon: <AnalyticsIcon /> },
    { id: 'movies', text: 'Quản lý phim', icon: <TasksIcon /> },
    { id: 'accounts', text: 'Quản lý tài khoản', icon: <ClientsIcon /> },
    { id: 'banner', text: 'Quản lý banner', icon: <ClientsIcon /> },
    { id: 'food', text: 'Đồ ăn', icon: <ClientsIcon /> },
    { id: 'drink', text: 'Nước uống', icon: <ClientsIcon /> },
    { id: 'combo', text: 'Combo', icon: <ClientsIcon /> },
    { id: 'ticket', text: 'Giá vé', icon: <ClientsIcon /> },
    { id: 'buy-ticket', text: 'Đặt vé', icon: <ClientsIcon /> },
  ]

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <DrawerHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Cenima
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Design by Dez
            </Typography>
          </Box>
        </Box>
      </DrawerHeader>

      <List component="nav" sx={{ flexGrow: 1 }}>
        {mainListItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={selectedItem === item.id}
              onClick={() => handleListItemClick(item.id)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(32, 80, 130, 0.08)',
                  borderRight: '3px solid #205082',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: 'rgba(32, 80, 130, 0.12)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: selectedItem === item.id ? 'primary.main' : 'text.secondary',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  color: selectedItem === item.id ? 'primary.main' : 'text.primary',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <Box sx={{
        p: 2,
        mt: 'auto',
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar
            alt="Riley Carter"
            src="https://ext.same-assets.com/3581030820/2049025025.jpeg"
            sx={{ width: 36, height: 36 }}
          />
          <Box>
            <Typography variant="body2" fontWeight={500}>
              Lê Thắng
            </Typography>
            <Typography variant="caption" color="text.secondary">
              cenima@gmail.com
            </Typography>
          </Box>
        </Box>
        <IconButton size="small">
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  )

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, boxShadow: 3 },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, boxShadow: 3 },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  )
}
