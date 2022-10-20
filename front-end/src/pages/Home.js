import { useContext, Fragment } from 'react'
import Login from '../components/Login'
import { UidContext } from '../components/AppContext'
import Thread from '../components/Thread'

const Home = () => {
  const uid = useContext(UidContext)
  return (
    <Fragment>
      {uid ? (
        <div className="home container">
          <div className="main">
            <div className="home_header container"></div>
          </div>
          <Thread />
        </div>
      ) : (
        <Login />
      )}
    </Fragment>
  )
}

export default Home
