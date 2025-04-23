import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Box, Tab, Typography } from "@mui/material"
import TabContext from '@mui/lab/TabContext'
import { TabList, TabPanel } from '@mui/lab'

const CustomDialog = () => {
    const [open, setOpen] = React.useState(false)
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper')
    const [selectedTime, setSelectedTime] = React.useState<{ theaterId: string, time: string } | null>(null)

    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true)
        setScroll(scrollType)
    }

    const handleClose = () => {
        setOpen(false)
    }
    const handleChair = () => {
        setOpen(false)
    }
    const [loading, setLoading] = React.useState(false)
    const descriptionElementRef = React.useRef<HTMLElement>(null)
    const [value, setValue] = React.useState('0')
    const today = new Date()

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(true)
            if (open) {
                const { current: descriptionElement } = descriptionElementRef
                if (descriptionElement !== null) {
                    descriptionElement.focus()
                }
            }
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timeout)
    }, [open])

    const next5Days = Array.from({ length: 5 }, (_, index) => {
        const date = new Date(today)
        date.setDate(today.getDate() + index)

        return date.toLocaleDateString()
    })

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    const dataTheater = [
        { format: '2D Phụ đề tiếng Anh' },
        {
            location: 'Hồ Chí Minh',
            id: '1',
            data: [
                {
                    id: '1',
                    description: '2D',
                    cinema: 'AEON Bình Tân',
                    showtime: ['22:55', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
                },
                {
                    id: '2',
                    description: '2D',
                    cinema: 'Vincom Thảo Điền',
                    showtime: ['16:00', '18:00', '20:00', '22:00'],
                },
                {
                    id: '3',
                    description: '2D',
                    cinema: 'CGV Crescent Mall',
                    showtime: ['18:00', '20:00', '22:00'],
                },
                {
                    id: '4',
                    description: '2D',
                    cinema: 'Lotte Cinema Gò Vấp',
                    showtime: ['18:30', '20:30', '22:30'],
                },
                {
                    id: '5',
                    description: '2D',
                    cinema: 'BHD Star Phạm Hùng',
                    showtime: ['18:00', '20:00', '22:00', '21:15'],
                },
            ],
        },
        {
            location: 'Hà Nội',
            id: '2',
            data: [
                {
                    id: '1',
                    description: '2D',
                    cinema: 'CGV Vincom Bà Triệu',
                    showtime: ['18:00', '20:00', '22:00', '21:15'],
                },
                {
                    id: '2',
                    description: 'Rạp GOLDCLASS',
                    cinema: 'Lotte Cinema Hà Đông',
                    showtime: ['18:00', '20:00', '22:00', '21:15'],
                },
                {
                    id: '3',
                    description: 'Rạp STARIUM',
                    cinema: 'BHD Star Long Biên',
                    showtime: ['18:00', '20:00', '22:00', '21:15'],
                },
                {
                    id: '4',
                    description: '2D',
                    cinema: 'CGV Royal City',
                    showtime: ['18:00', '20:00', '22:00', '21:15'],
                },
                {
                    id: '5',
                    description: '2D',
                    cinema: 'Vincom Trần Duy Hưng',
                    showtime: ['18:00', '20:00', '22:00', '21:15'],
                },
            ],
        },
        {
            location: 'Đà Nẵng',
            id: '3',
            data: [
                {
                    id: '1',
                    description: '2D',
                    cinema: 'CGV Vincom Bà Triệu',
                    showtime: ['18:00', '20:00', '22:00', '21:15'],
                },
                {
                    id: '2',
                    description: 'Rạp GOLDCLASS',
                    cinema: 'Lotte Cinema Hà Đông',
                    showtime: ['18:00', '20:00', '22:00', '21:15'],
                },
                {
                    id: '3',
                    description: 'Rạp STARIUM',
                    cinema: 'BHD Star Long Biên',
                    showtime: ['18:00', '20:00', '22:00', '21:15'],
                },
                {
                    id: '4',
                    description: '2D',
                    cinema: 'CGV Royal City',
                    showtime: ['18:00', '20:00', '22:00', '21:15'],
                },
                {
                    id: '5',
                    description: '2D',
                    cinema: 'Vincom Trần Duy Hưng',
                    showtime: ['18:00', '20:00', '22:00', '21:15'],
                },
            ],
        },
        {
            location: 'Hải Phòng',
            id: '4',
            data: [
                {
                    id: '1',
                    description: '2D',
                    cinema: 'CGV Vincom Bà Triệu',
                    showtime: ['18:00', '20:00', '22:00', '21:15'],
                },
                {
                    id: '2',
                    description: 'Rạp GOLDCLASS',
                    cinema: 'Lotte Cinema Hà Đông',
                    showtime: ['18:00', '20:00', '22:00', '21:15'],
                },
                {
                    id: '3',
                    description: 'Rạp STARIUM',
                    cinema: 'BHD Star Long Biên',
                    showtime: ['18:00', '20:00', '22:00', '21:15'],
                },
                {
                    id: '4',
                    description: '2D',
                    cinema: 'CGV Royal City',
                    showtime: ['18:00', '20:00', '22:00', '21:15'],
                },
                {
                    id: '5',
                    description: '2D',
                    cinema: 'Vincom Trần Duy Hưng',
                    showtime: ['18:00', '20:00', '22:00', '21:15'],
                },
            ],
        }
    ]

    const locations = dataTheater.filter(item => item.location)
    const [selectedDate, setSelectedDate] = React.useState(next5Days[0])


    const [currentTime, setCurrentTime] = React.useState(new Date())
    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 60 * 1000)

        return () => clearInterval(timer)
    }, [])

    const isPastTime = (timeStr: string) => {
        const [hours, minutes] = timeStr.split(':').map(Number)

        const showTime = new Date(currentTime)
        showTime.setHours(hours, minutes, 0, 0)

        return showTime < currentTime
    }

    return (
        <React.Fragment>
            <Button onClick={handleClickOpen('paper')} sx={{ width: "100px", margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Tooltip title="Click để đặt vé">
                    <IconButton
                        onClick={() => setLoading(true)}
                        disabled={loading}
                        sx={{
                            color: "#fff",
                            backgroundColor: "#ff9800",
                            '&:hover': {
                                backgroundColor: "#fb8c00",
                            },
                            px: 2, py: 1.2,
                            borderRadius: 2,
                        }}
                    >
                        <ShoppingCartIcon sx={{ mr: 1 }} />
                        <Typography variant="button" sx={{ color: "#fff" }}>
                            Đặt vé ngay
                        </Typography>
                    </IconButton>
                </Tooltip>
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">
                    {next5Days.map((date, index) => (
                        <Button
                            key={index}
                            variant={selectedDate === date ? 'contained' : 'outlined'}
                            color={selectedDate === date ? 'success' : 'inherit'}
                            onClick={() => setSelectedDate(date)}
                            style={{ marginRight: "5px", marginTop: "5px" }}
                        >
                            {date}
                        </Button>
                    ))}
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="Location Tabs" variant="scrollable" scrollButtons="auto">
                                        {locations.map((item, index) => (
                                            <Tab key={index} label={item.location} value={String(index)} />
                                        ))}
                                    </TabList>
                                </Box>

                                {locations.map((item, index) => (
                                    <TabPanel key={index} value={String(index)}>
                                        {item.data?.map((theater, tIdx) => (
                                            <Box key={tIdx} mb={2}>
                                                <Typography variant="subtitle1" fontWeight="medium">
                                                    {theater.cinema} ({theater.description})
                                                </Typography>

                                                <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                                                    {theater.showtime.map((time, timeIdx) => {
                                                        const isSelected = selectedTime?.theaterId === theater.id && selectedTime?.time === time

                                                        return (
                                                            <Button
                                                                key={timeIdx}
                                                                size="small"
                                                                variant={isSelected ? "contained" : "outlined"}
                                                                color={isSelected ? "success" : "primary"}
                                                                disabled={isPastTime(time)}
                                                                onClick={() => setSelectedTime({ theaterId: theater.id, time })}
                                                            >
                                                                {time}
                                                            </Button>
                                                        )
                                                    })}
                                                </Box>
                                            </Box>
                                        ))}
                                    </TabPanel>
                                ))}
                            </TabContext>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button
                        disabled={!selectedTime}
                        onClick={handleChair}
                    >
                        Đặt ghế
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default CustomDialog