import { useState, useEffect, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UidContext } from '../AppContext'
import axios from 'axios'

const SignInForm = () => {
  const uid = useContext(UidContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [btn, setBtn] = useState(false)

  useEffect(() => {
    if (password.length > 5 && email !== '') {
      setBtn(true)
    } else if (btn) {
      setBtn(false)
    }
  }, [password, email, btn])

  const handleLogin = (e) => {
    e.preventDefault()
    const emailError = document.querySelector('.email.error')
    const passwordError = document.querySelector('.password.error')

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res)
        if (res.data.errors) {
          emailError.innerHTML = res.response.data.errors.email
          passwordError.innerHTML = res.response.data.errors.password
        } else {
          window.location = '/home'
        }
      })
      .catch((err) => {
        emailError.innerHTML = err.response.data.errors.email
        passwordError.innerHTML = err.response.data.errors.password
      })
  }

  return (
    <div className="signUpLoginBox">
      {uid ? (
        <Navigate to="/home" replace={true} />
      ) : (
        <div className="slContainer container">
          <div className="formBoxRight">
            <div className="email error centertext"></div>
            <div className="password error centertext"></div>
            <div className="formContent">
              <h2>Connexion</h2>
              <form action="" onSubmit={handleLogin} id="sign-up-form">
                <div className="inputBox">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    required
                  />

                  <label htmlFor="email">Email</label>
                </div>

                <div className="inputBox">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    required
                  />

                  <label htmlFor="password">Mot de passe</label>
                </div>
                {<button disabled={btn ? false : true}>Connexion</button>}
              </form>
              <div className="linkContainer">
                <Link className="simpleLink" to="/signup">
                  Nouveau sur Groupomania ? Inscrivez-vous maintenant.
                </Link>
                <br />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SignInForm
