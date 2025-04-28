import React, { useEffect, useState } from "react"
import { Container, Card, CardContent, Typography, Tabs, Tab, Box } from '@mui/material'
import { getAllTheaters } from "../../../services/thearterApi"
import { TheaterType } from "../../../type/types"

const Theater = () => {
    const [theaters, setTheaters] = useState<TheaterType[]>([])
    const [cities, setCities] = useState<string[]>([])
    const [value, setValue] = useState(0)

    useEffect(() => {
        fetchTheaters()
    }, [])

    const fetchTheaters = async () => {
        try {
            const response = await getAllTheaters()
            if (!response) return
            setTheaters(response)
            const uniqueCities = Array.from(new Set(response.map((theater) => theater.city)))
            console.log(uniqueCities)
            setCities(uniqueCities)
        } catch (err) {
            console.log(err)
        }
    }
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }
    const filteredTheaters = theaters.filter((theater) => theater.city === cities[value])

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Danh sách Rạp Chiếu Phim
            </Typography>

            <Tabs value={value} onChange={handleTabChange} centered>
                {cities.map((city, index) => (
                    <Tab key={index} label={city} />
                ))}
            </Tabs>

            {/* Hiển thị thông báo nếu không có rạp chiếu phim */}
            {filteredTheaters.length === 0 ? (
                <Typography variant="h6" color="textSecondary">
                    Không có rạp chiếu phim nào tại thành phố này.
                </Typography>
            ) : (
                <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="space-between"
                    gap={2}
                >
                    {filteredTheaters.map((theater) => (
                        <Box
                            key={theater.id}
                            width={{ xs: "100%", sm: "48%", md: "30%" }}
                            mb={2}  // khoảng cách dưới mỗi box
                        >
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{theater.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Địa chỉ: {theater.address}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Loại: {theater.type}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
            )}
        </Container>
    )
}

export default Theater
