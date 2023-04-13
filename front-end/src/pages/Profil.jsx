import { useContext, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { UidContext } from '../components/AppContext'
import DisabledAccound from '../components/DisabledAccound'
import Login from '../components/Login'
import UpdateProfil from '../components/UpdateProfil'
import BanAccound from '../components/BanAccound'

const Profil = () => {
  const uid = useContext(UidContext)
  const userData = useSelector((state) => state.userReducer)

  return (
    <Fragment>
      {uid ? (
        <Fragment>
          {userData.isAccound === true || userData.isAdmin === true ? (
            <>
              {userData.isBan === false || userData.isAdmin === true ? (
                <div className="profil-page">
                  <UpdateProfil />
                </div>
              ) : (
                <BanAccound />
              )}
            </>
          ) : (
            <DisabledAccound />
          )}
        </Fragment>
      ) : (
        <Login />
      )}
    </Fragment>
  )
}

export default Profil
