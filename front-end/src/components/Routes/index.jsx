import { Route, Routes } from 'react-router-dom'
import Header from '../Header'
import From from '../../pages/From'
import Login from '../Login'
import SignUp from '../Signup'
import Home from '../../pages/Home'
import Profil from '../../pages/Profil'
import Footer from '../Footer'
import ErrorPage from '../../pages/ErrorPage'
import Wall from '../../pages/Wall'
import { Fragment } from 'react'

const routes = () => {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<From />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/wall" element={<Wall />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Fragment>
  )
}

export default routes
