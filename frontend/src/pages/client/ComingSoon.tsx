import React from "react"
import Movie from "../../components/Movie"

const ComingSoon = () => {
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

    return (
        <section className="container">
            <div>
                <h1>Phim sắp chiếu</h1>
                <div className="now_showing">
                    {movies.map((movie, index) => (
                        <div key={index}>
                            <Movie movie={movie} />
                        </div>
                    ))}
                </div>
            </div>


        </section>
    )
}

export default ComingSoon