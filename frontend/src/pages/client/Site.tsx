import React from "react"
const Site = () => {

    const sites = [
        { location: "Hồ Chí Minh" },
        { location: "Hà Nội" },
        { location: "Đà Nẵng" },
        { location: "Gia Lai" },
        { location: "Hải Phòng" },
        { location: "Quãng Ngãi" },
        { location: "Bình Dương" },
        { location: "Đồng Nai" }
    ]

    return (
        <div className="container">
            <div className="site">
                <div className="site-title">
                    <h1><span className="highlight-c">C</span>enima</h1>
                </div>
                <div className="site-card">
                    {sites.map((site, index) => (
                        <div key={index} className="site-location">
                            {site.location}
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}
export default Site