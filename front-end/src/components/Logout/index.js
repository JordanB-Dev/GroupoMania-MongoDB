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
    window.location = '/login'
  }

  return (
    <div className="logoutContainer">
      <div
        onClick={() => {
          if (window.confirm('Voulez-vous déconnecter de votre compte ?')) {
            logout()
          }
        }}
        className="switch"
      >
        <img src="./img/icons/logout.svg" alt="logout" />
      </div>
    </div>
  )
}

export default Logout
