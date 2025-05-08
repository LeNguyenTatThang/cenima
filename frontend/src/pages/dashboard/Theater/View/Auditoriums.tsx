import React, { useEffect, useState } from "react"
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Slide,
    TextField,
    CardActions,
    Tooltip,
    IconButton
} from "@mui/material"
import { createAuditorium, deleteAuditorium, getAuditoriums } from "../../../../services/auditoriumApi"
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
        fetchAuditoriums()
        setName("")
        setCapacity(0)
        setOpen(false)
    }
    const fetchAuditoriums = async () => {
        try {
            const data = await getAuditoriums()
            setAuditoriums(data)
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
            fetchAuditoriums()
            showMessage("Xoá phong chiếu phim thành công")
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getNameTheater(Number(id))
        fetchAuditoriums()
    }, [])

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
            <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Tên phòng</strong></TableCell>
                            <TableCell><strong>Sức chứa</strong></TableCell>
                            <TableCell>...</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {auditoriums.map((auditorium) => (
                            <TableRow key={auditorium.id}>
                                <TableCell>{auditorium.id}</TableCell>
                                <TableCell>{auditorium.name}</TableCell>
                                <TableCell>{auditorium.capacity}</TableCell>
                                <TableCell>
                                    <CardActions>
                                        <Tooltip title="Xem chi tiết">
                                            <IconButton onClick={() => handleView(auditorium.id)}>
                                                <Visibility />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Chỉnh sửa">
                                            <IconButton onClick={() => handleEdit(auditorium)}>
                                                <Edit />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Xoá">
                                            <IconButton onClick={() => handleDelete(auditorium.id)}>
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </CardActions>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Auditoriums
