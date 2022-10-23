import { useContext, Fragment } from 'react'
import { UidContext } from '../components/AppContext'
import Login from '../components/Login'
import UpdateProfil from '../components/UpdateProfil'

const Profil = () => {
  const uid = useContext(UidContext)

  return (
    <Fragment>
      {uid ? (
        <div className="profil-page">
          <UpdateProfil />
        </div>
      ) : (
        <Login />
      )}
    </Fragment>
  )
}

export default Profil
