import { useDispatch, useSelector } from 'react-redux'
import { activeAccound } from '../../actions/user.actions'
import axios from 'axios'
import cookie from 'js-cookie'

const DisabledAccound = () => {
  const userData = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()

  const handleActive = () => {
    dispatch(activeAccound(userData._id))
  }

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
    <div className="disabled_page">
      <p className="disabled_page_introuvable">
        Oups! Votre compte est désactivé.
      </p>
      <img src="./img/icons/disabled.png" alt="disabled" />
      <button
        className="disabled_page_disabled"
        onClick={() => {
          if (window.confirm('Voulez-vous réactiver votre compte ?')) {
            handleActive()
            window.location.href = '/profil'
          }
        }}
      >
        Activé le compte
      </button>

      <button className="disabled_page_logout" onClick={logout}>
        Déconnexion
      </button>
    </div>
  )
}

export default DisabledAccound
