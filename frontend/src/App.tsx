import React from 'react'
import Nav from './layouts/Nav'
import Footer from './layouts/Footer'
import Home from './pages/client/Home'
import './styles/style.css'
import './styles/main.js'
import { BrowserRouter, Routes, Route } from 'react-router'
import Cultureplex from './pages/client/Cultureplex'
import Event from './pages/client/Event'
import MemberShip from './pages/client/MemberShip'
import Login from './pages/client/Login'
import NotFound from './pages/client/NotFound'
import Theater from './pages/client/Theater'
import NowShowing from './pages/client/NowShowing'
import ComingSoon from './pages/client/ComingSoon'
import Site from './pages/client/Site'
import TheaterSpecial from './pages/client/TheaterSpecial'
import Special3D from './pages/client/3D'
import DetailMovie from './pages/client/DetailMovie'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme/theme'
import DashboardPage from './pages/dashboard/DashboardPage'
import Layout from './layouts/LayoutAdmin'
import Movies from './pages/dashboard/Movies'
import Account from './pages/dashboard/Account/Account'

import CreateAccount from './pages/dashboard/Account/Create'
import Banner from './pages/dashboard/Banner/Banner'
import CreateBanner from './pages/dashboard/Banner/Create'
import TheaterAdmin from './pages/dashboard/Theater/Theater'
import CreateTheater from './pages/dashboard/Theater/Create'
import Auditoriums from './pages/dashboard/Theater/View/Auditoriums'
import Room from './pages/dashboard/Theater/View/Room/Room'
import AppLoader from './components/common/AppLoader'
import Food from './pages/dashboard/Food/Food'
import Price from './pages/dashboard/Price/Price'
import Promotions from './pages/client/Promotions'
import Drink from './pages/dashboard/Drink/Drink'
function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="App">
          <AppLoader>
            <Routes>
              {/* Client Routes */}
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
              <Route path="/movie/:slug" element={<><Nav /><DetailMovie /><Footer /></>} />
              <Route path="/event/promotions" element={<><Nav /><Promotions /><Footer /></>} />

              <Route path="/login" element={<><Login /></>} />
              <Route path="*" element={<NotFound />} />
              {/* Admin Routes */}
              <Route path="/dashboard" element={<Layout><DashboardPage /> </Layout>} />
              <Route path="/dashboard/movies" element={<Layout> <Movies /> </Layout>} />
              <Route path="/dashboard/accounts" element={<Layout><Account /></Layout>} />
              <Route path="/dashboard/account/create" element={<Layout><CreateAccount /></Layout>} />
              <Route path='/dashboard/banner' element={<Layout> <Banner />  </Layout>} />
              <Route path='/dashboard/banner/create' element={<Layout> <CreateBanner /> </Layout>} />
              <Route path='/dashboard/theater' element={<Layout> <TheaterAdmin /></Layout>} />
              <Route path='/dashboard/Theater/create' element={<Layout> <CreateTheater /></Layout>} />
              <Route path='/dashboard/theater/view/:id' element={<Layout> <Auditoriums /></Layout>} />
              <Route path='/dashboard/theater/view/:theater_id/room/:id' element={<Layout> <Room /></Layout>} />
              <Route path="/dashboard/food" element={<Layout> <Food /> </Layout>} />
              <Route path="/dashboard/ticket" element={<Layout> <Price /> </Layout>} />
              <Route path="/dashboard/drink" element={<Layout> <Drink /> </Layout>} />
            </Routes>
          </AppLoader>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
