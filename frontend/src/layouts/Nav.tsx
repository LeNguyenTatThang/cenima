import { Link } from 'react-router'
import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
function Nav() {
    const Hamburger = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="52"
            height="24"
            viewBox="0 0 52 24"
        >
            <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
                <rect
                    id="Rectangle_3"
                    data-name="Rectangle 3"
                    width="42"
                    height="4"
                    rx="2"
                    transform="translate(304 47)"
                    fill="#574c4c"
                />
                <rect
                    id="Rectangle_5"
                    data-name="Rectangle 5"
                    width="42"
                    height="4"
                    rx="2"
                    transform="translate(304 67)"
                    fill="#574c4c"
                />
                <rect
                    id="Rectangle_4"
                    data-name="Rectangle 4"
                    width="52"
                    height="4"
                    rx="2"
                    transform="translate(294 57)"
                    fill="#574c4c"
                />
            </g>
        </svg>
    )
    const [showNavbar, setShowNavbar] = React.useState(false)
    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar)
    }
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [activeMenu, setActiveMenu] = React.useState<string | null>(null)

    const handleMouseEnter = (event: React.MouseEvent<HTMLElement>, menu: string) => {
        setAnchorEl(event.currentTarget)
        setActiveMenu(menu)
    }

    const handleMouseLeave = () => {
        setAnchorEl(null)
        setActiveMenu(null)
    }

    return (
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to="/" className='no-underline'><h1>  <span className="highlight-c">C</span>enima</h1></Link>
                </div>
                <div className="menu-icon" onClick={handleShowNavbar}>
                    <Hamburger />
                </div>
                <div className={`nav-elements  ${showNavbar && "active"}`}>
                    <ul>
                        <li
                            onMouseEnter={(e) => handleMouseEnter(e, 'movies')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Button component={Link} to="/" sx={{ color: '#333' }}>
                                Phim
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={activeMenu === 'movies'}
                                onClose={handleMouseLeave}
                                MenuListProps={{
                                    onMouseLeave: handleMouseLeave,
                                }}
                            >
                                <MenuItem component={Link} to="/now-showing" onClick={handleMouseLeave}>
                                    Phim đang chiếu
                                </MenuItem>
                                <MenuItem component={Link} to="/coming-soon" onClick={handleMouseLeave}>
                                    Phim sắp chiếu
                                </MenuItem>
                            </Menu>
                        </li>

                        <li
                            onMouseEnter={(e) => handleMouseEnter(e, 'theater')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Button component={Link} to="/theater" sx={{ color: '#333' }}>
                                Rạp
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={activeMenu === 'theater'}
                                onClose={handleMouseLeave}
                                MenuListProps={{
                                    onMouseLeave: handleMouseLeave,
                                }}
                            >
                                <MenuItem component={Link} to="/theater/site" onClick={handleMouseLeave}>
                                    Tất cả rạp
                                </MenuItem>
                                <MenuItem component={Link} to="/theater/theaters-special" onClick={handleMouseLeave}>
                                    Rạp đặc biệt
                                </MenuItem>
                                <MenuItem component={Link} to="/theater/3d" onClick={handleMouseLeave}>
                                    Rạp 3D
                                </MenuItem>
                            </Menu>
                        </li>

                        <li
                            onMouseEnter={(e) => handleMouseEnter(e, 'member')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Button component={Link} to="/member" sx={{ color: '#333' }}>
                                Thành viên
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={activeMenu === 'member'}
                                onClose={handleMouseLeave}
                                MenuListProps={{
                                    onMouseLeave: handleMouseLeave,
                                }}
                            >
                                <MenuItem component={Link} to="/member/profile" onClick={handleMouseLeave}>
                                    Tài khoản Cinema
                                </MenuItem>
                                <MenuItem component={Link} to="/member/membership" onClick={handleMouseLeave}>
                                    Quyền lợi
                                </MenuItem>
                            </Menu>
                        </li>

                        <li
                            onMouseEnter={(e) => handleMouseEnter(e, 'cultureplex')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Button component={Link} to="/cultureplex" sx={{ color: '#333' }}>
                                CULTUREPLEX
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={activeMenu === 'cultureplex'}
                                onClose={handleMouseLeave}
                                MenuListProps={{
                                    onMouseLeave: handleMouseLeave,
                                }}
                            >
                                <MenuItem component={Link} to="/cultureplex/info" onClick={handleMouseLeave}>
                                    Quầy Online
                                </MenuItem>
                                <MenuItem component={Link} to="/cultureplex/info" onClick={handleMouseLeave}>
                                    Thuê Rạp & Vé Nhóm
                                </MenuItem>
                                <MenuItem component={Link} to="/cultureplex/info" onClick={handleMouseLeave}>
                                    Quầy Online
                                </MenuItem>
                                <MenuItem component={Link} to="/cultureplex/info" onClick={handleMouseLeave}>
                                    E-Cenima
                                </MenuItem>
                                <MenuItem component={Link} to="/cultureplex/info" onClick={handleMouseLeave}>
                                    Cenima Egift
                                </MenuItem>
                                <MenuItem component={Link} to="/cultureplex/info" onClick={handleMouseLeave}>
                                    Cenima Rules
                                </MenuItem>
                            </Menu>
                        </li>

                        <li
                            onMouseEnter={(e) => handleMouseEnter(e, 'event')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Button component={Link} to="/event" sx={{ color: '#333' }}>
                                Ưu đãi & Tin tức
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={activeMenu === 'event'}
                                onClose={handleMouseLeave}
                                MenuListProps={{
                                    onMouseLeave: handleMouseLeave,
                                }}
                            >
                                <MenuItem component={Link} to="/event/promotions" onClick={handleMouseLeave}>
                                    Khuyến mãi
                                </MenuItem>
                            </Menu>
                        </li>

                        <li
                            onMouseEnter={(e) => handleMouseEnter(e, 'login')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Button component={Link} to="/" sx={{ color: '#333' }}>
                                Đăng nhập
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={activeMenu === 'login'}
                                onClose={handleMouseLeave}
                                MenuListProps={{
                                    onMouseLeave: handleMouseLeave,
                                }}
                            >
                                <MenuItem component={Link} to="/login" onClick={handleMouseLeave}>
                                    Đăng nhập
                                </MenuItem>
                                <MenuItem component={Link} to="/register" onClick={handleMouseLeave}>
                                    Đăng ký
                                </MenuItem>
                            </Menu>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav