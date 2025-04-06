import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Autoplay, Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Movie from "../components/Movie"
import SwiperCore from 'swiper'
SwiperCore.use([Navigation, Autoplay, EffectCoverflow, Pagination])
const Home = () => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])
    const movies = [
        {
            title: "QUỶ NHẬP TRÀNG",
            slug: "quy-nhap-trang",
            image: "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/q/u/qu_nh_p_tr_ng_-_payoff_poster_-_kc_07032025_1_.jpg",
            age: "18+",
            description: "Đạo diễn: Pom Nguyễn"
        },
        {
            title: "HUYẾT ÁN TRUY HÀNH",
            slug: "huyet-an-truy-hanh",
            image: "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/p/o/poster_huy_t_n_truy_h_nh.jpg",
            age: "18+",
            description: "Đạo diễn: Man Ki Kwok"
        },
        {
            title: "CUỐC XE KINH HOÀNG",
            slug: "cuoc-xe-kinh-hoang",
            image: "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/p/o/poster_cuoc_xe_kinh_hoang_4.jpg",
            age: "12+",
            description: ""
        },
        {
            title: "ÂM DƯƠNG LỘ",
            slug: "am-duong-lo",
            image: "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/3/5/350x495-adl_1__1.jpg",
            age: "16+",
            description: ""
        },
        {
            title: "NGHỀ SIÊU KHÓ NÓI",
            slug: "nghe-sieu-kho-noi",
            image: "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/f/f/ff-main_poster.jpg",
            age: "13+",
            description: ""
        },
        {
            title: "NÀNG BẠCH TUYẾT",
            slug: "nang-bach-tuyet",
            image: "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/s/n/snow_white_-_vn_payoff_-_1sheet.jpg",
            age: "12+",
            description: ""
        }
    ]
    
    return isClient ? (
        <>
            <Swiper
                loop={true}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={2}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 150,
                    modifier: 3,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={true}
                modules={[Autoplay, EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src="https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980x448_14_-min.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980x448_68_.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980_x_488_4.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980x448_14_-min.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980x448_10__2.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980x448_13_.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/b/_/b_n_sao_c_a_980x448.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980_x_488_4.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980x448_kfc-min.jpg" />
                </SwiperSlide>
            </Swiper>
            <div className="movies-section">
                <h1 className="movies-title">Movies Selection</h1>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 120,
                        modifier: 0,
                        slideShadows: true,
                    }}
                    spaceBetween={20}
                    slidesPerView={5}
                    loop={true}
                    navigation
                    allowTouchMove={false}
                    modules={[Navigation]}
                    className="movies-container"
                >
                    {movies.map((movie, index) => (
                        <SwiperSlide key={index}>
                            <Movie movie={movie} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="movies-section">
                <h1 className="movies-title">Event</h1>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 120,
                        modifier: 0,
                        slideShadows: true,
                    }}
                    spaceBetween={20}
                    slidesPerView={5}
                    loop={true}
                    navigation
                    allowTouchMove={false}
                    modules={[Navigation]}
                    className="movies-container"
                >
                    {movies.map((movie, index) => (
                        <SwiperSlide key={index}>
                            <Movie movie={movie} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>

    ) : (
        <p>Loading...</p>
    )
}

export default Home
