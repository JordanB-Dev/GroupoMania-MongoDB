import { useState, useRef, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
  uploadPictureAdmin,
  updateBioAdmin,
  updateEmailAdmin,
  updateFirstNameAdmin,
  updateLastNameAdmin,
  updatePasswordAdmin,
  banAccound,
  unBanAccound,
} from '../../actions/user.actions'
import { getUsers } from '../../actions/users.action'

const UpdateProfilAdmin = ({ data }) => {
  const { search } = useLocation()
  const idUser = new URLSearchParams(search).get('id')
  const [bio, setBio] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [controlPassword, setControlPassword] = useState('')
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [passwordFlag, setPasswordFlag] = useState({
    length: false,
    min: false,
    maj: false,
    num: false,
    special: false,
  })

  const [bioPopup, setBioPopup] = useState(false)
  const [firstNamePopup, setFirstNamePopup] = useState(false)
  const [lastNamePopup, setLastNamePopup] = useState(false)
  const [emailPopup, setEmailPopup] = useState(false)
  const [passwordPopup, setPasswordPopup] = useState(false)

  const [updateForm, setUpdateForm] = useState(false)
  const [bioUpdate, setBioUpdate] = useState(false)
  const [firstNameUpdate, setFirstNameUpdate] = useState(false)
  const [lastNameUpdate, setLastNameUpdate] = useState(false)
  const [emailUpdate, setEmailUpdate] = useState(false)
  const [passwordUpdate, setPasswordUpdate] = useState(false)

  const refFirstNameError = useRef()
  const refLastNameError = useRef()
  const refPasswordInfos = useRef()

  const dispatch = useDispatch()

  const handleUpdate = () => {
    dispatch(updateBioAdmin(idUser, bio))
    dispatch(getUsers())
    setBioUpdate(true)
  }

  const checkFirstName = () => {
    if (firstname.trim().length < 3 || firstname.trim().length > 20) {
      refFirstNameError.current.innerText =
        'Votre prénom doit faire entre 3 et 20 caractères'
    } else if (
      !firstname.match(/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i)
    ) {
      refFirstNameError.current.innerText =
        'Le prénom ne doit pas  contenir de cractères spéciaux'
    } else {
      refFirstNameError.current.innerText = ''
      return true
    }
  }

  const handleFirstName = (event) => {
    event.preventDefault()
    if (checkFirstName()) dispatch(updateFirstNameAdmin(idUser, firstname))
    dispatch(getUsers())
    setFirstNameUpdate(true)
  }

  const checkLastName = () => {
    if (lastname.trim().length < 3 || lastname.trim().length > 20) {
      refLastNameError.current.innerText =
        'Votre nom doit faire entre 3 et 20 caractères'
    } else if (
      !lastname.match(/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i)
    ) {
      refLastNameError.current.innerText =
        'Le nom ne doit pas  contenir de cractères spéciaux'
    } else {
      refLastNameError.current.innerText = ''
      return true
    }
  }

  const handleLastName = (event) => {
    event.preventDefault()
    if (checkLastName()) dispatch(updateLastNameAdmin(idUser, lastname))
    dispatch(getUsers())
    setLastNameUpdate(true)
  }

  const handleEmail = (event) => {
    event.preventDefault()
    dispatch(updateEmailAdmin(idUser, email))
    dispatch(getUsers())
    setEmailUpdate(true)
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

  const btn =
    password !== controlPassword ? (
      <>
        <h4 className="error"> Les mots de passe ne correspondent pas</h4>
        <input disabled type="submit" value="Changer" />
      </>
    ) : (
      <input type="submit" value="Changer" />
    )

  const handlePassword = (event) => {
    event.preventDefault()
    dispatch(updatePasswordAdmin(idUser, password))
    dispatch(getUsers())
    setPasswordUpdate(true)
  }

  const handlePicture = () => {
    dispatch(uploadPictureAdmin(idUser))
    dispatch(getUsers())
  }

  const handleBan = () => {
    dispatch(banAccound(idUser))
    dispatch(getUsers())
  }

  const handleUnBan = () => {
    dispatch(unBanAccound(idUser))
    dispatch(getUsers())
  }

  return (
    <div>
      <div className="btn-container">
        <button
          className="btn-container_firstname"
          onClick={() => setFirstNamePopup(true)}
        >
          Changer le prénom
        </button>
        <button
          className="btn-container_lastname"
          onClick={() => setLastNamePopup(true)}
        >
          Changer le nom
        </button>
        <button
          className="btn-container_email"
          onClick={() => setEmailPopup(true)}
        >
          Changer l'adresse mail
        </button>
        <button
          className="btn-container_password"
          onClick={() => setPasswordPopup(true)}
        >
          Changer le mot de passe
        </button>
        <button className="btn-container_bio" onClick={() => setBioPopup(true)}>
          Changer la bio
        </button>

        <button
          className="btn-container_picture"
          onClick={() => {
            if (window.confirm('Voulez-vous changer la photo de profil ?')) {
              handlePicture()
            }
          }}
        >
          Changer la photo
        </button>
        <button
          className="btn-container_ban"
          onClick={() => {
            if (window.confirm('Voulez-vous désactiver le compte ?')) {
              handleBan()
            }
          }}
        >
          Bannir le compte
        </button>
        <button
          className="btn-container_unban"
          onClick={() => {
            if (window.confirm('Voulez-vous activé le compte ?')) {
              handleUnBan()
            }
          }}
        >
          Débannir le compte
        </button>
      </div>
      {bioPopup && (
        <Fragment>
          <div className="popup-profil-container">
            <div className="modal">
              <h4 className="success">
                {bioUpdate && 'Votre email a bien été changer !'}
              </h4>
              <h3>Changer la bio</h3>

              {updateForm === false && (
                <>
                  <p onClick={() => setUpdateForm(!updateForm)}>{data.bio}</p>
                  <button
                    className="btn_update"
                    onClick={() => setUpdateForm(!updateForm)}
                  >
                    Modifier bio
                  </button>
                </>
              )}

              {updateForm && (
                <>
                  <textarea
                    type="text"
                    defaultValue={data.bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                  <button
                    className="btn_update"
                    onClick={() => {
                      handleUpdate()
                      setUpdateForm(false)
                    }}
                  >
                    Valider modifications
                  </button>
                </>
              )}

              <span className="cross" onClick={() => setBioPopup(false)}>
                &#10005;
              </span>
            </div>
          </div>
        </Fragment>
      )}
      {firstNamePopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <div className="error" ref={refFirstNameError}></div>
            <h4 className="success">
              {firstNameUpdate && 'Votre prénom a bien été changer !'}
            </h4>
            <h3>Changer le prénom</h3>
            <form
              action=""
              onSubmit={handleFirstName}
              id="firstname-update-form"
            >
              <input
                type="text"
                name="firstname"
                id="firstname"
                defaultValue={data.firstname}
                onChange={(e) => setFirstname(e.target.value)}
                autoComplete="off"
              />
              <br />
              <input type="submit" value="Changer" />
            </form>
            <span className="cross" onClick={() => setFirstNamePopup(false)}>
              &#10005;
            </span>
          </div>
        </div>
      )}
      {lastNamePopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <div className="error" ref={refLastNameError}></div>
            <h4 className="success">
              {lastNameUpdate && 'Votre nom a bien été changer !'}
            </h4>
            <h3>Changer le nom</h3>
            <form action="" onSubmit={handleLastName} id="lastname-update-form">
              <input
                type="text"
                name="lastname"
                id="lastname"
                defaultValue={data.lastname}
                onChange={(e) => setLastname(e.target.value)}
                autoComplete="off"
              />
              <br />
              <input type="submit" value="Changer" />
            </form>
            <span className="cross" onClick={() => setLastNamePopup(false)}>
              &#10005;
            </span>
          </div>
        </div>
      )}
      {emailPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h4 className="success">
              {emailUpdate && 'Votre email a bien été changer !'}
            </h4>
            <h3>Changer l'adresse mail</h3>
            <form action="" onSubmit={handleEmail} id="email-update-form">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Adresse mail"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
              <br />
              <input type="submit" value="Changer" />
            </form>
            <span className="cross" onClick={() => setEmailPopup(false)}>
              &#10005;
            </span>
          </div>
        </div>
      )}
      {passwordPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h4 className="success">
              {passwordUpdate && 'Votre mot de passe a bien été changer !'}
            </h4>
            <h3>Changer le mot de passe</h3>
            <form action="" onSubmit={handlePassword} id="password-update-form">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Mot de passe"
                onChange={(event) => {
                  setPassword(event.target.value)
                  checkPassword(event.target.value)
                }}
                value={password}
              />
              <br />
              <br />
              <input
                type="password"
                name="password"
                id="password-conf"
                placeholder="Corfirme le mot de passe"
                onChange={(e) => setControlPassword(e.target.value)}
                value={controlPassword}
              />
              <br />
              {btn}
              <br />
              {passwordFocus ? (
                <ul ref={refPasswordInfos}>
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
                      {passwordFlag.special ? '✔️' : '❌'} Un caractère spécial
                    </li>
                  </div>
                </ul>
              ) : null}
            </form>
            <span className="cross" onClick={() => setPasswordPopup(false)}>
              &#10005;
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdateProfilAdmin
