import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material"

const ticketData = [
    {
        day: "Thứ 2, 4, 5",
        showtimes: [
            {
                time: "Trước 17:00",
                prices: [
                    "75.000",
                    "55.000",
                    "55.000"
                ]
            },
            {
                time: "Sau 17:00",
                prices: [
                    "80.000",
                    "55.000",
                    "55.000"
                ]
            }
        ]
    },
    {
        day: "Thứ 3",
        showtimes: [
            {
                time: "Happy Day",
                prices: [
                    "55.000",
                    "55.000",
                    "55.000"
                ]
            }]
    },
    {
        day: "Thứ 6, 7, CN",
        showtimes: [
            {
                time: "Trước 17:00",
                prices: [
                    "85.000",
                    "65.000",
                    "65.000"
                ]
            },
            {
                time: "Sau 17:00",
                prices: [
                    "95.000",
                    "65.000",
                    "65.000"
                ]
            }
        ]
    },
    {
        day: "Ngày lễ",
        showtimes: [
            {
                time: "",
                prices: [
                    "100.000",
                    "100.000",
                    "65.000"
                ]
            }
        ]
    },
    {
        day: "Ngày tri ân",
        showtimes: [
            {
                time: "",
                prices: [
                    "50.000",
                    "50.000",
                    "50.000"
                ]
            }
        ]
    },
    {
        day: "Sau 22h (thành viên)",
        showtimes: [
            {
                time: "",
                prices: [
                    "60.000",
                    "50.000",
                    "50.000"
                ]
            }
        ]
    }
]

export default function Promotions() {
    return (
        <div className="container" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            <TableContainer component={Paper}>
                <Table
                    sx={{
                        "& td, & th": {
                            textAlign: "center",
                            verticalAlign: "middle",
                        },
                        "& .special-cell": {
                            textAlign: "start !important",
                            fontWeight: "bold",
                            paddingLeft: "3rem"
                        },
                    }}
                >
                    <TableHead sx={{ background: "linear-gradient(to right, #003366, #004080)" }}>
                        <TableRow>
                            <TableCell
                                sx={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    borderRight: "1px solid rgba(255,255,255,0.5)",
                                }}
                            >
                                Thời gian
                            </TableCell>
                            <TableCell
                                sx={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    borderRight: "1px solid rgba(255,255,255,0.5)",
                                }}
                            >
                                Suất chiếu
                            </TableCell>
                            <TableCell
                                sx={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    borderRight: "1px solid rgba(255,255,255,0.5)",
                                }}
                            >
                                ⭐ Thành viên / Người lớn
                            </TableCell>
                            <TableCell
                                sx={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    borderRight: "1px solid rgba(255,255,255,0.5)",
                                }}
                            >
                                U22
                            </TableCell>
                            <TableCell
                                sx={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                }}
                            >
                                Trẻ em / Người cao tuổi
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ticketData.map((item, index) => {
                            const isSpecialDay = item.showtimes.length === 1 && item.showtimes[0].time === ""
                            const showtimeCount = item.showtimes.length
                            const isTuesday = item.day === "Thứ 3"

                            const priceTypes = [0, 1, 2]
                            const isPriceUniform = (priceIndex: number) => {
                                const firstPrice = item.showtimes[0].prices[priceIndex]

                                return item.showtimes.every(s => s.prices[priceIndex] === firstPrice)
                            }

                            const uniformPrices = priceTypes.map(idx =>
                                isPriceUniform(idx) ? item.showtimes[0].prices[idx] : null
                            )

                            if (isSpecialDay) {

                                return (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            background: "linear-gradient(to right,rgb(8, 90, 172),rgb(70, 214, 53))",
                                            color: "#fff",
                                        }}
                                    >
                                        <TableCell colSpan={2} className="special-cell" sx={{
                                            borderRight: "1px solid rgba(255,255,255,0.5)", color: "#fff",
                                            fontWeight: "bold"
                                        }}>
                                            ⭐ {item.day}
                                        </TableCell>
                                        <TableCell
                                            sx={{ borderRight: "1px solid rgba(255,255,255,0.5)" }}
                                        >
                                            {uniformPrices[0]}
                                        </TableCell>
                                        <TableCell
                                            sx={{ borderRight: "1px solid rgba(255,255,255,0.5)" }}
                                        >
                                            {uniformPrices[1]}
                                        </TableCell>
                                        <TableCell>{uniformPrices[2]}</TableCell>
                                    </TableRow>
                                )
                            }

                            return item.showtimes.map((s, idx) => {
                                const rowStyle = {
                                    background: isTuesday
                                        ? "linear-gradient(to right,rgb(150, 153, 55),rgb(172, 137, 71))"
                                        : "linear-gradient(to right,rgb(37, 82, 127),rgb(85, 141, 197))",
                                    color: "#fff",
                                    fontWeight: isTuesday ? "bold" : "normal",
                                }

                                return (
                                    <TableRow key={`${index}-${idx}`} sx={rowStyle}>
                                        {idx === 0 && (
                                            <TableCell
                                                rowSpan={showtimeCount}
                                                sx={{ borderRight: "1px solid rgba(255,255,255,0.5)", color: "#fff", fontWeight: "bold" }}
                                            >
                                                {item.day}
                                            </TableCell>
                                        )}

                                        <TableCell sx={{ borderRight: "1px solid rgba(255,255,255,0.5)" }}>
                                            {s.time}
                                        </TableCell>

                                        {/* Thành viên / Người lớn */}
                                        {uniformPrices[0] !== null ? (
                                            idx === 0 ? (
                                                <TableCell
                                                    rowSpan={showtimeCount}
                                                    sx={{ borderRight: "1px solid rgba(255,255,255,0.5)" }}
                                                >
                                                    {uniformPrices[0]}
                                                </TableCell>
                                            ) : null
                                        ) : (
                                            <TableCell sx={{ borderRight: "1px solid rgba(255,255,255,0.5)" }}>
                                                {s.prices[0]}
                                            </TableCell>
                                        )}

                                        {/* U22 */}
                                        {uniformPrices[1] !== null ? (
                                            idx === 0 ? (
                                                <TableCell
                                                    rowSpan={showtimeCount}
                                                    sx={{ borderRight: "1px solid rgba(255,255,255,0.5)" }}
                                                >
                                                    {uniformPrices[1]}
                                                </TableCell>
                                            ) : null
                                        ) : (
                                            <TableCell sx={{ borderRight: "1px solid rgba(255,255,255,0.5)" }}>
                                                {s.prices[1]}
                                            </TableCell>
                                        )}

                                        {/* Trẻ em / Người cao tuổi */}
                                        {uniformPrices[2] !== null ? (
                                            idx === 0 ? (
                                                <TableCell rowSpan={showtimeCount}>
                                                    {uniformPrices[2]}
                                                </TableCell>
                                            ) : null
                                        ) : (
                                            <TableCell>{s.prices[2]}</TableCell>
                                        )}
                                    </TableRow>
                                )
                            })
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}