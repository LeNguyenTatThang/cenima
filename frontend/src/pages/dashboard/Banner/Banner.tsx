import { Typography, Button, Box, TableContainer, Paper, Table, TableHead, TableCell, TableRow, TableBody, Chip, alpha } from "@mui/material"
import React, { useEffect, useState } from "react"
import { BannerType } from "../../../type/types"
import { useNavigate } from "react-router-dom"
import { getAllbanner } from "../../../services/bannerApi"
import theme from "../../../theme/theme"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import BannerEditModal from "../../../components/dashboard/BannerEditModal"
const Banner = () => {
    const [banners, setBanners] = useState<BannerType[]>([])
    const [openModal, setOpenModal] = React.useState(false)
    const [selectedBanner, setSelectedBanner] = React.useState<BannerType | null>(null)
    const navigate = useNavigate()
    useEffect(() => {
        fetchBanners()
    }, [])
    const fetchBanners = async () => {
        try {
            const data = await getAllbanner()
            setBanners(data)
        } catch (err) {
            console.log(err)
        }
    }
    const handleClick = () => {
        navigate('/dashboard/banner/create')
    }
    const handleEdit = (id: number) => {
        const banner = banners.find(banner => banner.id === id)
        if (banner) {
            setOpenModal(true)
            setSelectedBanner(banner)
        }
    }
    const handleDelete = async (id: number) => {
        const banner = banners.find(banner => banner.id === id)
        if (banner) {
            const confirmDelete = window.confirm('Bạn có muốn xóa banner này không?')
            if (confirmDelete) {
                try {
                    const res = await fetch(`http://localhost:5000/api/deleteBanner/${id}`, {
                        method: 'DELETE'
                    })
                    if (res.ok) {
                        fetchBanners()
                    }
                } catch (err) {
                    console.log(err)
                }

            }
        }
    }


    return (
        <>
            <Box sx={{ mt: 4 }}>
                <Button
                    onClick={handleClick}
                    variant="contained"
                    color="primary"
                    sx={{
                        borderRadius: 3,
                        textTransform: "none",
                        fontSize: "1rem",
                        padding: "8px 20px",
                    }}
                >
                    Thêm Banner
                </Button>
                <Typography variant="h5" gutterBottom textAlign="center">
                    Danh sách Banner
                </Typography>
                <TableContainer component={Paper} sx={{ maxWidth: 1200, mx: "auto" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>ID</strong></TableCell>
                                <TableCell><strong>Image banner</strong></TableCell>
                                <TableCell><strong>Title</strong></TableCell>
                                <TableCell><strong>Link</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                                <TableCell><strong>Ngày tao</strong></TableCell>
                                <TableCell><strong>Thao tác</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {banners.map((banner: any) => (
                                <TableRow key={banner.id}>
                                    <TableCell>{banner.id}</TableCell>
                                    <TableCell>
                                        <img
                                            src={banner?.image}
                                            alt={banner.title}
                                            style={{ width: 120, height: 70, borderRadius: "5%" }}
                                        />
                                    </TableCell>
                                    <TableCell>{banner.title}</TableCell>
                                    <TableCell>{banner.link ? banner.link : "Trong"}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={banner.status}
                                            size="small"
                                            sx={{
                                                backgroundColor:
                                                    banner.status === "active"
                                                        ? alpha(theme.palette.success.main, 0.1)
                                                        : alpha(theme.palette.error.main, 0.1),
                                                color:
                                                    banner.status === "active"
                                                        ? theme.palette.success.main
                                                        : theme.palette.error.main,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {new Date(banner.createdAt).toLocaleDateString("vi-VN")}
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleEdit(banner.id)}>
                                            <EditIcon color="warning" />
                                        </Button>
                                        <Button onClick={() => handleDelete(banner.id)}>
                                            <DeleteIcon color="error" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {banners.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        Không có dữ liệu.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <BannerEditModal
                open={openModal}
                banner={selectedBanner}
                onClose={() => setOpenModal(false)}
                onUpdated={fetchBanners}
            />
        </>
    )
}
export default Banner