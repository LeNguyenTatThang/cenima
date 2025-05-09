import React, { useEffect, useState } from "react"
import {
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Slide,
    TextField,
    Box,
    Grid,
    Card,
    CardContent
} from "@mui/material"
import { createAuditorium, deleteAuditorium, getAuditorium } from "../../../../services/auditoriumApi"
import { AuditoriumType } from "../../../../type/types"
import { useParams } from "react-router-dom"
import { getTheater } from "../../../../services/thearterApi"
import { TransitionProps } from "@mui/material/transitions"
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import { Delete, Edit, Visibility } from "@mui/icons-material"
import { useSnackbar } from "../../../../components/dashboard/SnackbarContext"

const Transition = React.forwardRef(function Transition(

    props: TransitionProps & {
        children: React.ReactElement
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />
})

const groupByFloor = (auditoriums: AuditoriumType[]) => {
    const map = new Map<string, AuditoriumType[]>()

    auditoriums.forEach((room) => {
        if (room && room.name) {
            const floor = room.name.match(/\d+/)?.[0] || "Khác"
            if (!map.has(floor)) {
                map.set(floor, [])
            }
            map.get(floor)!.push(room)
        }
    })

    return map
}

const Auditoriums = () => {
    const [auditoriums, setAuditoriums] = useState<AuditoriumType[]>([])
    const [theaterName, setTheaterName] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [capacity, setCapacity] = useState<number>(0)
    const { id } = useParams()
    const [open, setOpen] = React.useState(false)
    const { showMessage } = useSnackbar()
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSave = async () => {
        try {
            await createAuditorium({
                name: name,
                capacity: capacity,
                theater_id: Number(id)
            })
        } catch (err) {
            console.log(err)
        }
        fetchAuditoriums(Number(id))
        setName("")
        setCapacity(0)
        setOpen(false)
    }
    const fetchAuditoriums = async (id: number) => {
        try {
            const data = await getAuditorium(id)
            console.log(data)
            if (Array.isArray(data)) {
                setAuditoriums(data ?? [])
            } else {
                console.error("Dữ liệu không phải là mảng:", data)
            }
        } catch (err) {
            console.log(err)
        }
    }


    const getNameTheater = async (id: number) => {
        try {
            const data = await getTheater(id)
            setTheaterName(data.name)
        } catch (err) {
            console.log(err)
        }
    }

    const handleView = (id: number) => {
        console.log(id)

    }
    const handleEdit = (auditorium: AuditoriumType) => {
        console.log(auditorium)
    }
    const handleDelete = async (id: number) => {
        try {
            await deleteAuditorium(id)
            fetchAuditoriums(Number(id))
            showMessage("Xoá phong chiếu phim thành công")
        } catch (err) {
            console.log(err)
        }
    }

    const handleClickPage = (id: number) => {
        console.log(id)
    }
    useEffect(() => {
        getNameTheater(Number(id))
        fetchAuditoriums(Number(id))
    }, [id])

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Danh sách phòng chiếu - {theaterName}
            </Typography>
            <Button variant="contained" onClick={handleClickOpen} >Tạo phòng chiếu</Button>
            <Dialog
                open={open}
                slots={{
                    transition: Transition,
                }}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Tạo phòng chiếu"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" style={{ marginTop: "10px" }}>
                        <TextField fullWidth id="outlined-basic" name="name" value={name} type="text" onChange={(e) => setName(e.target.value)} label="Tên phòng" variant="outlined" />
                        <TextField fullWidth id="outlined-basic" name="capacity" value={capacity} type="number" onChange={(e) => setCapacity(Number(e.target.value))} style={{ marginTop: "10px" }} label="Sức chứa" variant="outlined" />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}><SaveIcon />Luu</Button>
                    <Button onClick={handleClose}><CloseIcon />Huy</Button>
                </DialogActions>
            </Dialog>
            <Box p={1}>
                {[...groupByFloor(auditoriums).entries()].map(([floor, rooms]) => (
                    <Box key={floor} mb={4}>
                        <Typography variant="h6" gutterBottom>
                            Tầng {floor}
                        </Typography>
                        <Grid container spacing={2}>
                            {auditoriums.length === 0 ? (
                                <Box sx={{ flex: 1 }}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="body2" color="text.secondary">
                                                Không có phòng nào
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Box>
                            ) : (

                                rooms.map((data) => (
                                    <Box key={data.id} sx={{ flex: 1 }}>
                                        <Card onClick={() => handleClickPage(data.id)}>
                                            <CardContent>
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    {data.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Sức chứa: {data.capacity} chỗ
                                                </Typography>
                                                <Box mt={1}>
                                                    <Button variant="contained" onClick={() => handleView(data.id)}><Visibility /></Button>
                                                    <Button variant="contained" onClick={() => handleEdit(data)} style={{ marginLeft: "10px" }}><Edit /></Button>
                                                    <Button variant="contained" onClick={() => handleDelete(data.id)} style={{ marginLeft: "10px" }}><Delete /></Button>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                ))
                            )}
                        </Grid>
                    </Box>
                ))}
            </Box>

        </div>
    )
}

export default Auditoriums
