import axios from 'axios'
import cookie from 'js-cookie'

const Logout = () => {
  const removeCookie = (key) => {
    if (window !== 'undefined') {
      cookie.remove(key, { expires: 1 })
    }
  }

  const logout = async () => {
    await axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie('jwt'))
      .catch((err) => console.log(err))
    setTimeout(() => {
      window.location = '/login'
    }, 1000)
  }

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input onClick={logout} type="checkbox" />
        <span className="slider round"></span>
      </label>
    </div>
  )
}

export default Logout
