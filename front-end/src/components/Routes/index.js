import { Route, Routes } from 'react-router-dom'
import Header from '../Header'
import From from '../../pages/From'
import Login from '../Login'
import SignUp from '../Signup'
import Home from '../../pages/Home'
import Profil from '../../pages/Profil'
import Footer from '../Footer'

const routes = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<From />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default routes
