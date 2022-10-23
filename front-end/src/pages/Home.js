import { useContext, Fragment } from 'react'
import { useSelector } from 'react-redux'
import Login from '../components/Login'
import { UidContext } from '../components/AppContext'
import Thread from '../components/Thread'
import PostForm from '../components/PostFrom'
import DisabledAccound from '../components/DisabledAccound'

const Home = () => {
  const uid = useContext(UidContext)
  const userData = useSelector((state) => state.userReducer)
  return (
    <Fragment>
      {uid ? (
        <Fragment>
          {userData.isAccound === true || userData.isAdmin === true ? (
            <div className="home container">
              <div className="main">
                <div className="home_header container"></div>
                <PostForm />
              </div>
              <Thread />
            </div>
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

export default Home
