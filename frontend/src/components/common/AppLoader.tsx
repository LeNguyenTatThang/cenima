// src/components/common/AppLoader.tsx
import React, { useEffect, useState } from 'react'
import '../../styles/AppLoader.css'

const AppLoader = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            document.body.style.display = 'block' // hoặc unset
            document.body.style.justifyContent = ''
            document.body.style.alignItems = ''
            document.body.style.height = ''
            document.body.style.overflow = 'auto'
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    if (loading) {
        return (
            <>

                <div className="loading-container">
                    <div className="loading-text">
                        <span>C</span>
                        <span>E</span>
                        <span>N</span>
                        <span>I</span>
                        <span>M</span>
                        <span>A</span>
                    </div>
                </div>
                <div className="socials">
                    <a className="social-link" href="https://twitter.com/aybukeceylan" target="_top">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-twitter">
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                        </svg>
                    </a>
                    <a className="social-link" href="https://www.linkedin.com/in/ayb%C3%BCkeceylan/" target="_top">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                    </a>
                </div>
            </>
        )
    }

    return <>{children}</>
}

export default AppLoader
