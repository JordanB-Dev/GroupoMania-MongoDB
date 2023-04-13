import { useContext, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { UidContext } from '../components/AppContext'
import DisabledAccound from '../components/DisabledAccound'
import WallContent from '../components/WallContent'
import Login from '../components/Login'
import BanAccound from '../components/BanAccound'

const Wall = () => {
  const { search } = useLocation()
  const idUser = new URLSearchParams(search).get('id')
  const usersData = useSelector((state) => state.usersReducer)
  const data = usersData.filter((user) => user._id.toString() === idUser)[0]
  const userData = useSelector((state) => state.userReducer)
  const uid = useContext(UidContext)

  return (
    <Fragment>
      {uid ? (
        <Fragment>
          {userData.isAccound === true || userData.isAdmin === true ? (
            <>
              {userData.isBan === false || userData.isAdmin === true ? (
                <div className="wall container">
                  <div className="main">
                    <div className="wall_header container"></div>
                    <WallContent data={data} />
                  </div>
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

export default Wall
