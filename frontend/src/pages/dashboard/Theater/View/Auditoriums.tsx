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
    CardContent,
    Stack,
    useMediaQuery,
    useTheme
} from "@mui/material"
import { createAuditorium, deleteAuditorium, getAuditorium, updateAuditorium } from "../../../../services/auditoriumApi"
import { AuditoriumType } from "../../../../type/types"
import { useParams } from "react-router-dom"
import { getTheater } from "../../../../services/thearterApi"
import { TransitionProps } from "@mui/material/transitions"
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import { Delete, Edit, Visibility } from "@mui/icons-material"
import { useSnackbar } from "../../../../components/dashboard/SnackbarContext"
import { useNavigate } from "react-router-dom"
import AudiroriumEdit from "../../../../components/dashboard/AuditoriumEditModal"

const Transition = React.forwardRef(function Transition(

    props: TransitionProps & {
        children: React.ReactElement
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />
})
type AuditoriumWithFloorLetter = AuditoriumType & { floorLetter: string }
const groupByFloor = (auditoriums: AuditoriumType[]) => {
    const map = new Map<string, AuditoriumWithFloorLetter[]>()

    auditoriums.forEach((room) => {
        if (room && room.name) {

            const floorNumber = room.name.match(/\d+/)?.[0] || "Khác"
            const floorLetter = room.name.match(/[A-Za-z]+/)?.[0] || ""

            if (!map.has(floorNumber)) {
                map.set(floorNumber, [])
            }
            const roomWithLetter = { ...room, floorLetter }

            map.get(floorNumber)!.push(roomWithLetter)
        }
    })


    map.forEach((rooms) => {
        rooms.sort((a, b) => {
            return a.floorLetter.localeCompare(b.floorLetter)
        })
    })

    return map
}

const Auditoriums = () => {
    const [auditoriums, setAuditoriums] = useState<AuditoriumType[]>([])
    const [theaterName, setTheaterName] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [capacity, setCapacity] = useState<number>(0)
    const { id } = useParams()
    const theater_id = Number(id)
    const [open, setOpen] = React.useState(false)
    const [openEdit, setOpenEdit] = React.useState(false)
    const [selectedAuditorium, setSelectedAuditorium] = React.useState<AuditoriumType | null>(null)
    const { showMessage } = useSnackbar()
    const navigate = useNavigate()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

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

    const handleSaveChange = async (form: { name: string; capacity: number }) => {
        if (!selectedAuditorium) return
        try {
            console.log(selectedAuditorium.id)
            const res = await updateAuditorium(selectedAuditorium.id, form)
            console.log(res)
            setOpenEdit(false)
            fetchAuditoriums(Number(id))
            showMessage("Cập nhật phong chiếu phim thành công")
        } catch (err) {
            console.log(err)
        }
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
        console.log(theater_id, id)
        navigate(`/dashboard/theater/view/${theater_id}/room/${id}`)
    }
    const handleEdit = (data: AuditoriumType) => {
        setSelectedAuditorium(data)
        setOpenEdit(true)
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
                                                    <Stack
                                                        direction={isMobile ? "column" : "row"}
                                                        spacing={1}
                                                    >
                                                        <Button variant="outlined" onClick={() => handleView(data.id)}><Visibility /></Button>
                                                        <Button variant="outlined" onClick={() => handleEdit(data)}><Edit /></Button>
                                                        <Button variant="outlined" onClick={() => handleDelete(data.id)}><Delete /></Button>
                                                    </Stack>

                                                    {/* Dialog Edit */}
                                                    <AudiroriumEdit
                                                        open={openEdit}
                                                        onClose={() => setOpenEdit(false)}
                                                        data={selectedAuditorium}
                                                        onSave={handleSaveChange}
                                                    />
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
