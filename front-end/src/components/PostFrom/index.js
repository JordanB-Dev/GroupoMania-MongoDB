import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { timestampParser } from '../Utils'
import { NavLink } from 'react-router-dom'
import { addPost, getPosts } from '../../actions/post.actions'

const PostForm = () => {
  const [message, setMessage] = useState('')
  const [postPicture, setPostPicture] = useState(null)
  const [file, setFile] = useState()
  const userData = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()

  const handlePost = async () => {
    if (message || postPicture) {
      const data = new FormData()
      data.append('posterId', userData._id)
      data.append('message', message)
      if (file) data.append('file', file)

      await dispatch(addPost(data))
      dispatch(getPosts())
      cancelPost()
    } else {
      alert('Veuillez entrer un message')
    }
  }

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  const cancelPost = () => {
    setMessage('')
    setPostPicture('')
    setFile('')
  }

  return (
    <div className="post-container">
      <NavLink to="/profil">
        <div className="user-info">
          <img src={userData.picture} alt="user-img" />
          <h3 className="margin">{userData.firstname}</h3>
          <h3 className="margin">{userData.lastname}</h3>
        </div>
      </NavLink>
      <div className="post_form">
        <textarea
          name="message"
          id="message"
          placeholder="Quoi de neuf ?"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />

        {message || postPicture ? (
          <li className="card_container">
            <div className="card_left">
              <img src={userData.picture} alt="user-pic" />
            </div>
            <div className="card_right">
              <div className="card_header">
                <div className="name">
                  <h3 className="margin">{userData.firstname}</h3>
                  <h3 className="margin">{userData.lastname}</h3>
                </div>
                <span>{timestampParser(Date.now())}</span>
              </div>
              <div className="content">
                <p>{message}</p>
                <img src={postPicture} alt="" />
              </div>
            </div>
          </li>
        ) : null}
        <div className="footer_form">
          <div className="icon">
            <img src="./img/icons/picture.svg" alt="img" />
            <input
              type="file"
              id="file-upload"
              name="file"
              accept=".jpg, .jpeg, .png, .gif"
              onChange={(e) => handlePicture(e)}
            />
          </div>
          <div className="btn_send">
            {message || postPicture ? (
              <button className="cancel" onClick={cancelPost}>
                Annuler
              </button>
            ) : null}
            <button className="send" onClick={handlePost}>
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostForm
