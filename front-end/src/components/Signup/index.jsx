import { useState, useRef, useContext, Fragment } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UidContext } from '../AppContext'
import Login from '../Login'
import axios from 'axios'

const SignIn = ({ form }) => {
  const uid = useContext(UidContext)

  const [formSubmit, setFormSubmit] = useState(false)
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [controlPassword, setControlPassword] = useState('')
  const [accountCreated, setAccountCreated] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [passwordFlag, setPasswordFlag] = useState({
    length: false,
    min: false,
    maj: false,
    num: false,
    special: false,
  })

  const refSignupFirstName = useRef()
  const refSignupEmail = useRef()
  const refSignupPassword = useRef()
  const refSignupPasswordInfos = useRef()
  const refSignupPasswordConfirmation = useRef()

  const refSignupFirstNameError = useRef()
  const refSignupLastNameError = useRef()
  const refSignupEmailError = useRef()
  const refSignupPasswordError = useRef()
  const refSignupPasswordConfirmationError = useRef()

  const checkFirstName = () => {
    if (firstname.trim() === '') {
      refSignupFirstNameError.current.innerText = ''
    } else if (firstname.trim().length < 3 || firstname.trim().length > 20) {
      refSignupFirstNameError.current.innerText =
        'Votre prénom doit faire entre 3 et 20 caractères'
    } else {
      refSignupFirstNameError.current.innerText = ''
      return true
    }
  }

  const checkLastName = () => {
    if (lastname.trim() === '') {
      refSignupLastNameError.current.innerText = ''
    } else if (lastname.trim().length < 3 || lastname.trim().length > 20) {
      refSignupLastNameError.current.innerText =
        'Votre nom doit faire entre 3 et 20 caractères'
    } else {
      refSignupLastNameError.current.innerText = ''
      return true
    }
  }

  const checkEmail = (email) => {
    if (email.trim() === '') {
      refSignupEmailError.current.innerText = ''
    } else {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const check = regex.test(String(email).toLowerCase())
      refSignupEmailError.current.innerText = `${
        check ? '' : 'Email incorrect'
      }`

      if (check) return true
    }
  }

  const checkPassword = (password) => {
    setPasswordFocus(true)
    var flags = {
      length: false,
      min: false,
      maj: false,
      num: false,
      special: false,
    }

    if (password.length >= 8) {
      flags.length = true
    }
    if (password.match(/[a-z]/, 'g')) {
      flags.min = true
    }
    if (password.match(/[A-Z]/, 'g')) {
      flags.maj = true
    }
    if (password.match(/[0-9]/, 'g')) {
      flags.num = true
    }
    if (password.match(/\W|_/g)) {
      flags.special = true
    }
    setPasswordFlag((prev) => ({ ...prev, ...flags }))
  }

  const checkSamePassword = () => {
    if (
      refSignupPasswordConfirmation.current.value ===
      refSignupPassword.current.value
    ) {
      refSignupPasswordConfirmationError.current.innerHTML = ''
      return true
    } else {
      refSignupPasswordConfirmationError.current.innerHTML =
        'Les mots de passe ne correspondent pas'
    }
  }

  const btn =
    firstname === '' ||
    lastname === '' ||
    email === '' ||
    password === '' ||
    password !== controlPassword ? (
      <button disabled>Inscription</button>
    ) : (
      <button>Inscription</button>
    )

  const handleRegister = async (event) => {
    event.preventDefault()
    const firstnameError = document.querySelector('.firstname.error')
    const lastnameError = document.querySelector('.lastname.error')
    const emailError = document.querySelector('.email.error')
    const passwordError = document.querySelector('.password.error')
    const passwordConfirmError = document.querySelector(
      '.password-confirm.error'
    )

    passwordConfirmError.innerHTML = ''

    const { length, min, maj, num, special } = passwordFlag
    if (
      checkFirstName() &&
      checkLastName() &&
      checkEmail(refSignupEmail.current.value) &&
      length &&
      min &&
      maj &&
      num &&
      special &&
      checkSamePassword()
    )
      if (password !== controlPassword) {
        passwordConfirmError.innerHTML =
          'Les mots de passe ne correspondent pas'
      } else {
        await axios({
          method: 'post',
          url: `${process.env.REACT_APP_API_URL}api/user/register`,
          withCredentials: true,
          data: {
            lastname,
            firstname,
            email,
            password,
          },
        })
          .then((res) => {
            setFormSubmit(true)
            setAccountCreated(true)
          })
          .catch((err) => {
            console.log(err)
            firstnameError.innerHTML = err.response.data.errors.firstname
            lastnameError.innerHTML = err.response.data.errors.lastname
            emailError.innerHTML = err.response.data.errors.email
            passwordError.innerHTML = err.response.data.errors.password
          })
      }
  }

  return (
    <Fragment>
      {formSubmit ? (
        <>
          <Login />
          <span></span>
          <h4 className="success centertext">
            {accountCreated && 'Vous pouvez maintenant vous connecter !'}
          </h4>
        </>
      ) : (
        <div className="signUpLoginBox">
          {uid ? (
            <Navigate to="/home" replace={true} />
          ) : (
            <div className="slContainer">
              <div className="formBoxRight ">
                <div className="centertext">
                  <div
                    className="firstname error"
                    ref={refSignupFirstNameError}
                  ></div>
                  <div
                    className="lastname error"
                    ref={refSignupLastNameError}
                  ></div>
                  <div className="email error" ref={refSignupEmailError}></div>
                  <div
                    className="password error"
                    ref={refSignupPasswordError}
                  ></div>
                  <div
                    className="password-confirm error"
                    ref={refSignupPasswordConfirmationError}
                  ></div>
                </div>
                <div className="formContent">
                  <h2>Inscription</h2>
                  <form action="" onSubmit={handleRegister} id="sign-up-form">
                    <div className="inputBox">
                      <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        onChange={(event) => setFirstname(event.target.value)}
                        onBlur={checkFirstName}
                        value={firstname}
                        ref={refSignupFirstName}
                        autoComplete="off"
                        required
                      />
                      <label htmlFor="firstname">Prénom</label>
                      <br />
                    </div>

                    <div className="inputBox">
                      <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        onChange={(event) => setLastname(event.target.value)}
                        onBlur={checkLastName}
                        value={lastname}
                        autoComplete="off"
                        required
                      />
                      <label htmlFor="lastname">Nom</label>
                      <br />
                    </div>

                    <div className="inputBox">
                      <input
                        id="email"
                        name="email"
                        onChange={(event) => setEmail(event.target.value)}
                        onBlur={(e) => checkEmail(e.target.value)}
                        value={email}
                        ref={refSignupEmail}
                        autoComplete="off"
                        required
                      />
                      <label htmlFor="email">Adresse mail</label>

                      <br />
                    </div>

                    <div className="inputBox">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={(event) => {
                          setPassword(event.target.value)
                          checkPassword(event.target.value)
                        }}
                        onBlur={() => {
                          checkSamePassword()
                        }}
                        value={password}
                        ref={refSignupPassword}
                        autoComplete="off"
                        required
                      />
                      <label htmlFor="password">Mot de passe</label>

                      <br />
                    </div>

                    <div className="inputBox flexInput">
                      <input
                        type="password"
                        id="password-conf"
                        name="password"
                        ref={refSignupPasswordConfirmation}
                        onChange={(event) => {
                          setControlPassword(event.target.value)
                          checkSamePassword()
                        }}
                        value={controlPassword}
                        autoComplete="off"
                        required
                      />
                      <label htmlFor="confirmPassword">
                        Confirmer le mot de passe
                      </label>
                      {btn}
                      {passwordFocus ? (
                        <ul ref={refSignupPasswordInfos}>
                          <div>
                            <li className="length">
                              {passwordFlag.length ? '✔️' : '❌'} 8 caractères
                            </li>
                            <li className="maj">
                              {passwordFlag.maj ? '✔️' : '❌'} Une majuscule
                            </li>
                            <li className="min">
                              {passwordFlag.min ? '✔️' : '❌'} Une minuscule
                            </li>
                            <li className="num">
                              {passwordFlag.num ? '✔️' : '❌'} Un nombre
                            </li>
                            <li className="special">
                              {passwordFlag.special ? '✔️' : '❌'} Un caractère
                              spécial
                            </li>
                          </div>
                        </ul>
                      ) : null}
                    </div>
                  </form>
                  <div className="linkContainer">
                    <Link className="simpleLink" to="/login">
                      Déjà inscrit? Connectez-vous.
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  )
}

export default SignIn
