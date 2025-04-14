import { Box, Breadcrumbs, IconButton, Link, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material"
import React, { useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete'
import View from '@mui/icons-material/Visibility'
import Edit from '@mui/icons-material/Edit'
import {
    NavigateNext as NavigateNextIcon
} from '@mui/icons-material'
const Movies = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Avengers: Endgame",
            genre: ["Hành động", "Viễn tưởng"],
            director: "Anthony Russo, Joe Russo",
            mainActors: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
            releaseDate: "2019-04-26",
            duration: 181, // phút
            language: "Tiếng Anh",
            status: "Online",
            rating: 8.4,
            thumbnail: "https://example.com/endgame.jpg",
        },
        {
            id: 2,
            title: "Parasite",
            genre: ["Tâm lý", "Hài đen"],
            director: "Bong Joon-ho",
            mainActors: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
            releaseDate: "2019-05-30",
            duration: 132,
            language: "Tiếng Hàn",
            status: "Online",
            rating: 8.6,
            thumbnail: "https://example.com/parasite.jpg",
        },
        {
            id: 3,
            title: "Dune: Part Two",
            genre: ["Khoa học viễn tưởng", "Phiêu lưu"],
            director: "Denis Villeneuve",
            mainActors: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
            releaseDate: "2024-03-01",
            duration: 165,
            language: "Tiếng Anh",
            status: "Offline",
            rating: null,
            thumbnail: "https://example.com/dune2.jpg",
        }
    ])
    const handleStatusChange = (id: number, checked: boolean) => {
        const updated = movies.map(movie =>
            movie.id === id ? { ...movie, status: checked ? 'Online' : 'Offline' } : movie
        )
        setMovies(updated)
    }

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    <Link underline="hover" color="inherit" href="#">
                        Dashboard
                    </Link>
                    <Typography color="text.primary">Quản lý phim</Typography>
                </Breadcrumbs>
                <Typography variant="h4" sx={{ mt: 1 }}>
                    Danh sách phim đang chiếu
                </Typography>
            </Box>
            <Paper sx={{ width: '100%', mb: 4 }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tên phim</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Thể loại</TableCell>
                                <TableCell>Ngày chiếu</TableCell>
                                <TableCell>Thời lượng</TableCell>
                                <TableCell>Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {movies.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.title}
                                    </TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={row.status === 'Online'}
                                            onChange={(e) => handleStatusChange(row.id, e.target.checked)}
                                            color={row.status === 'Online' ? 'success' : 'error'}
                                        />
                                    </TableCell>
                                    <TableCell>{row.genre}</TableCell>
                                    <TableCell>{row.releaseDate}</TableCell>
                                    <TableCell>{row.duration} phút</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="delete" size="large">
                                            <View />
                                        </IconButton>
                                        <IconButton aria-label="delete" size="large">
                                            <Edit />
                                        </IconButton>
                                        <IconButton aria-label="delete" size="large">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={20}
                    rowsPerPage={5}
                    page={0}
                    onPageChange={() => { }}
                    onRowsPerPageChange={() => { }}
                />
            </Paper>
        </Box>

    )
}

export default Movies