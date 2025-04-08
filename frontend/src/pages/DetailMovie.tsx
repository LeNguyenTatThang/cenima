import React from "react"
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Typography } from "@mui/material"
const DetailMovie = () => {
    const dataDetail = {
        name: "ĐỊA ĐẠO: MẶT TRỜI TRONG BÓNG TỐI",
        slug: "dia-dao",
        image: "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/3/5/350x495-diadao.jpg",
        director: "Bùi Thạc Chuyên",
        cast: "Thái Hòa; Quang Tuấn; Diễm Hằng Lamoon; Anh Tú Wilson; Hồ Thu Anh",
        category: "Lịch sử",
        startDate: "04/04/2025",
        time: "128",
        language: "Tiếng Việt - phụ đề Tiếng Anh",
        rated: "T16 - Phim được phổ biến đến người xem từ đủ 16 tuổi trở lên (16+)",
        description: "Nhân dịp kỷ niệm 50 năm đất nước hoà bình này còn phim nào thoả được nỗi niềm thưởng thức thước phim thời chiến đầy hào hùng như Địa Đạo: Mặt Trời Trong Bóng Tối. Nay còn có thêm định dạng 4DX cho khán giả trải nghiệm chui hầm dưới lòng Củ Chi đất thép."
    }
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timeout)
    })

    return (
        <div className="container">
            <div className='movie-detail-background'>
                <h2>Nội dung phim</h2>
                <hr />
                <div className="movie-detail-container">
                    <div>
                        <img src={dataDetail.image} alt={dataDetail.slug} />
                    </div>
                    <div>
                        <div>
                            <h2>
                                {dataDetail.name}
                            </h2>
                        </div>
                        <div>
                            <strong>Đạo diễn: </strong><i>{dataDetail.director}</i>
                        </div>
                        <div>
                            <strong>Diễn viên: </strong><i>{dataDetail.cast}</i>
                        </div>
                        <div>
                            <strong>Thể loại: </strong><i>{dataDetail.category}</i>
                        </div>
                        <div>
                            <strong>Ngày chiếu: </strong><i>{dataDetail.startDate}</i>
                        </div>
                        <div>
                            <strong>Thời lượng phim: </strong><i>{dataDetail.time} phút</i>
                        </div>
                        <div>
                            <strong>Ngôn ngữ: </strong><i>{dataDetail.language}</i>
                        </div>
                        <div>
                            <strong>Reated (đánh giá): </strong><i>{dataDetail.rated}</i>
                        </div>
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

                    </div>
                </div>
                <div>
                    {dataDetail.description}
                </div>
            </div>
        </div>
    )
}
export default DetailMovie