import React, { useState } from "react"

const MemberShip = () => {
    const datas = [
        {
            title: "CHƯƠNG TRÌNH ĐIỂM THƯỞNG",
            content: "1 điểm = 1.000 VND, có giá trị như tiền mặt..."
        },
        {
            title: "QUÀ TẶNG SINH NHẬT",
            content: "Khi đến rạp đổi quà, khách hàng vui lòng xuất trình tài khoản..."
        },
        {
            title: "CẤP ĐỘ THÀNH VIÊN",
            content: "VIP: 01 CGV Birthday Combo + 01 Vé Xem Phim 2D/3D"
        },
        {
            title: "QUẢN LÝ TÀI KHOẢN",
            content: "Mỗi tuần, các thành viên sẽ nhận được Bản tin điện ảnh CGV..."
        },
        {
            title: "BẠN CẦN HỖ TRỢ",
            content: "Với những ưu đãi hấp dẫn từ chương trình thành viên..."
        }
    ]

    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className="container">
            <div className="membership-container">
                <div className="membership-tabs">
                    {datas.map((data, index: number) => (
                        <button
                            key={index}
                            className={`membership-tab ${activeIndex === index ? "active" : ""}`}
                            onClick={() => setActiveIndex(index)}
                        >
                            {data.title}
                        </button>
                    ))}
                </div>

                <div className="membership-content">
                    <h3>{datas[activeIndex].title}</h3>
                    <p>{datas[activeIndex].content}</p>
                </div>
            </div>
        </div>
    )
}

export default MemberShip
