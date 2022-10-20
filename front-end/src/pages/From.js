import { useContext, Fragment } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import { UidContext } from '../components/AppContext'

const From = () => {
  const uid = useContext(UidContext)

  return (
    <main className="welcomePage">
      {uid ? (
        <Navigate to="/home" replace={true} />
      ) : (
        <Fragment>
          <div className="leftBox">
            <NavLink className="btn-welcome" to="/signup">
              Inscription
            </NavLink>
          </div>
          <div className="rightBox">
            <NavLink className="btn-welcome" to="/login">
              Connexion
            </NavLink>
          </div>
        </Fragment>
      )}
    </main>
  )
}

export default From
