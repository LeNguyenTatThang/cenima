import React from 'react'
import Nav from './layouts/Nav'
import Footer from './layouts/Footer'
import Home from './pages/Home'
import './styles/style.css'
import './styles/main.js'
import { BrowserRouter, Routes, Route } from 'react-router'
import Cultureplex from './pages/Cultureplex'
import Event from './pages/Event'
import MemberShip from './pages/MemberShip'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Theater from './pages/Theater'
import NowShowing from './pages/NowShowing'
import ComingSoon from './pages/ComingSoon'
import Site from './pages/Site'
import TheaterSpecial from './pages/TheaterSpecial'
import Special3D from './pages/3D'
function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<><Nav /><Home /><Footer /></>} />
          <Route path="/theater" element={<><Nav /><Theater /><Footer /></>} />
          <Route path="/now-showing" element={<><Nav /><NowShowing /><Footer /></>} />
          <Route path="/coming-soon" element={<><Nav /><ComingSoon /><Footer /></>} />
          <Route path="/theater/site" element={<><Nav /><Site /><Footer /></>} />
          <Route path="/member/membership" element={<><Nav /><MemberShip /><Footer /></>} />
          <Route path="/event" element={<><Nav /><Event /><Footer /></>} />
          <Route path="/cultureplex" element={<><Nav /><Cultureplex /><Footer /></>} />
          <Route path="/theater/theaters-special" element={<><Nav /><TheaterSpecial /><Footer /></>} />
          <Route path="/theater/3d" element={<><Nav /><Special3D /><Footer /></>} />

          <Route path="/login" element={<><Login /></>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
