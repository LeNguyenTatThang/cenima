import React, { useEffect } from 'react'

function Footer() {
    useEffect(() => {
        const ticker = document.querySelector<HTMLElement>('.ticker-content')
        if (ticker) {
            ticker.style.transform = `translateX(${Math.random() * 100}%)`
        } else {
            console.error("Không tìm thấy phần tử .ticker-content")
        }
    }, [])

    return (
        <footer className="sesh-footer">
            <div className="noise-overlay"></div>
            <div className="scan-overlay"></div>

            <div className="footer-content flicker">
                <div className="ascii-art">
                    <h1>  <span className="highlight-c">C</span>inema</h1>
                </div>
                <div className="footer-text">
                    <h3>THE CINEMATIC EXPERIENCE</h3>
                    <p>immersed in stories · lights, camera, action · forever rolling</p>
                </div>
                <div className="sesh-links">
                    <a href="#" className="sesh-link">now showing</a>
                    <a href="#" className="sesh-link">coming soon</a>
                    <a href="#" className="sesh-link">contact</a>
                </div>
            </div>

            <div className="sesh-ticker">
                <div className="ticker-content">
                    EXPERIENCE THE MAGIC · MOVIES · POPCORN · CINEMA LOVERS · EXPERIENCE THE MAGIC · MOVIES · POPCORN · CINEMA LOVERS ·
                </div>
            </div>
        </footer>
    )
}

export default Footer