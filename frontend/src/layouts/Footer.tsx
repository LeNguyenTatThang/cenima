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
                    <h1>  <span className="highlight-c">C</span>enima</h1>
                </div>
                <div className="footer-text">
                    <h3>NOLOVE DIGITAL CEMETERY</h3>
                    <p>disconnected since 1998 · lost in the static · forever searching</p>
                </div>
                <div className="sesh-links">
                    <a href="#" className="sesh-link">bones</a>
                    <a href="#" className="sesh-link">sesh</a>
                    <a href="#" className="sesh-link">surrender</a>
                </div>
            </div>

            <div className="sesh-ticker">
                <div className="ticker-content">
                    THE CURE FOR PAIN IS IN THE PAIN · TEAMSESH · BONES · SURRENDERDOROTHY · OREGONTRAIL · NOLOVE · DIGITAL ARTIFACTS · THE CURE FOR PAIN IS IN THE PAIN · TEAMSESH · BONES · SURRENDERDOROTHY · OREGONTRAIL · NOLOVE · DIGITAL ARTIFACTS
                </div>
            </div>
        </footer>
    )
}

export default Footer