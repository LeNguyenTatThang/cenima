import React from "react"
import { Link } from "react-router-dom"

const Special3D = () => {
    const data = {
        title: "3D là một định dạng điện ảnh đem đến cho khách hàng những thước phim sống động, chân thực nhất.",
        content: "3D là một định dạng điện ảnh đem đến cho khách hàng những thước phim sống động, chân thực nhất. Tất cả các rạp của CGV đều có định dạng 3D để khách hàng thưởng thức điện ảnh trọn vẹn.Chi tiết xem",
        img: "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2022/092022/980x500.jpg"
    }

    return (
        <div className="container">
            <div>
                <div className="special-3d-content">
                    <h2>{data.title}</h2>
                    <p>{data.content} <Link to="#">tại đây!</Link></p>
                </div>
                <img src={data.img} alt="3D Cinema" className="special-3d-img" />
            </div>
        </div>
    )
}
export default Special3D