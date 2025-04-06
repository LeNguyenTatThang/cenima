import React from "react"

const TheaterSpecial = () => {
    const technologies = [
        {
            name: "IMAX",
            desc: "Công nghệ điện ảnh tân tiến nhất",
            img: "https://iguov8nhvyobj.vcdn.cloud/media/theaters/special/main-page/imax_cgv.jpg",
        },
        {
            name: "4DX",
            desc: "Đánh thức mọi giác quan",
            img: "https://iguov8nhvyobj.vcdn.cloud/media/theaters/special/main-page/17066596473020.jpg",
        },
        {
            name: "ULTRA 4DX",
            desc: "Trải nghiệm điện ảnh tốt đỉnh",
            img: "https://iguov8nhvyobj.vcdn.cloud/media/theaters/special/main-page/17079535042120.jpg",
        },
        {
            name: "SCREENX",
            desc: "Mở rộng thị giác vượt trội",
            img: "https://iguov8nhvyobj.vcdn.cloud/media/theaters/special/main-page/16844566032440.png",
        },
        {
            name: "STARIUM",
            desc: 'Trải nghiệm điện ảnh "vượt xa thực tế"',
            img: "https://iguov8nhvyobj.vcdn.cloud/media/theaters/special/main-page/Starium-new.jpg",
        },
    ]

    return (
        <div className="container">
            <div className="special">
                <h1>TẬN HƯỞNG CẢ THẾ GIỚI ĐIỆN ẢNH TẠI CENIMA</h1>
                <h2>#Công Nghệ
                    #Trải nghiệm
                    #Phong cách</h2>
                <div className="special-title">
                    <h2>CÔNG NGHỆ  &nbsp; &nbsp;</h2>
                    <p>
                        |  &nbsp;  Kết hợp toàn diện của 3 yếu tố (màn hình, âm thanh, ghế ngồi) nâng cấp trải nghiệm và cảm xúc khi xem phim
                    </p>
                </div>
                <div className="grid">
                    {technologies.map((tech, index) => (
                        <div className="tech-card" key={index}>
                            <img src={tech.img} alt={tech.name} />
                            <div className="tech-content">
                                <h3>{tech.name}</h3>
                                <p>{tech.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="special-title">
                    <h2>PHONG CÁCH  &nbsp; &nbsp;</h2>
                    <p>
                        |  &nbsp; Phòng chiếu theo chủ đề, phong cách độc đáo mang đến trải nghiệm điện ảnh ấn tượng, đẳng cấp
                    </p>
                </div>
                <div className="grid">
                    {technologies.map((tech, index) => (
                        <div className="tech-card" key={index}>
                            <img src={tech.img} alt={tech.name} />
                            <div className="tech-content">
                                <h3>{tech.name}</h3>
                                <p>{tech.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
export default TheaterSpecial