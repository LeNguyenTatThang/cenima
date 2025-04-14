import React, { useState } from 'react'
import {
    Box,
    Breadcrumbs,
    Card,
    CardContent,
    Link,
    Switch,
    Typography,
} from '@mui/material'
import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {
    NavigateNext as NavigateNextIcon
} from '@mui/icons-material'

const initialFloors = [
    {
        floor: 1,
        rooms: [
            { id: '1A', name: 'Phòng 1A', capacity: 80, status: true },
            { id: '1B', name: 'Phòng 1B', capacity: 60, status: false },
            { id: '1C', name: 'Phòng 1C', capacity: 100, status: true }
        ]
    },
    {
        floor: 2,
        rooms: [
            { id: '2A', name: 'Phòng 2A', capacity: 120, status: true },
            { id: '2B', name: 'Phòng 2B', capacity: 90, status: true },
            { id: '2C', name: 'Phòng 2C', capacity: 70, status: false },
            { id: '2D', name: 'Phòng 2D', capacity: 60, status: true }
        ]
    },
    {
        floor: 3,
        rooms: [
            { id: '3A', name: 'Phòng 3A', capacity: 110, status: true },
            { id: '3B', name: 'Phòng 3B', capacity: 85, status: true },
            { id: '3C', name: 'Phòng 3C', capacity: 95, status: true },
            { id: '3D', name: 'Phòng 3D', capacity: 75, status: false },
            { id: '3E', name: 'Phòng 3E', capacity: 60, status: true }
        ]
    }
]

const Theater = () => {
    const [floors, setFloors] = useState(initialFloors)
    const href = useNavigate()
    const toggleStatus = (floorIndex: number, roomIndex: number) => {
        const updatedFloors = [...floors]
        updatedFloors[floorIndex].rooms[roomIndex].status =
            !updatedFloors[floorIndex].rooms[roomIndex].status
        setFloors(updatedFloors)
    }
    const handleClickPage = (roomId: string) => {
        href(`/dashboard/theater/${roomId}`)
    }

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    <Link underline="hover" color="inherit" href="/dashboard">
                        Dashboard
                    </Link>
                    <Typography color="text.primary">Quản lý phòng chiếu</Typography>
                </Breadcrumbs>
                <Typography variant="h4" sx={{ mt: 1 }}>
                    Quản lý phòng chiếu phim
                </Typography>
            </Box>
            <Box p={1}>
                {floors.map((floor, floorIndex) => (
                    <Box key={floor.floor} mb={4}>
                        <Typography variant="h6" gutterBottom>
                            Tầng {floor.floor}
                        </Typography>
                        <Grid container spacing={2}>
                            {floor.rooms.map((room, roomIndex) => (
                                <React.Fragment key={room.id}>
                                    <Card onClick={() => handleClickPage(room.id)}>
                                        <CardContent>
                                            <Typography variant="subtitle1" fontWeight="bold">
                                                {room.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Sức chứa: {room.capacity} chỗ
                                            </Typography>
                                            <Box display="flex" alignItems="center" mt={1}>
                                                <Switch
                                                    checked={room.status}
                                                    onChange={() => toggleStatus(floorIndex, roomIndex)}
                                                    color={room.status ? 'success' : 'error'}
                                                />
                                                <Typography variant="body2" ml={1}>
                                                    {room.status ? 'Đang hoạt động' : 'Bảo trì'}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </React.Fragment>
                            ))}
                        </Grid>
                    </Box>
                ))}
            </Box>
        </Box>

    )
}

export default Theater