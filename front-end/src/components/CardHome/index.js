import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { dateParser, isEmpty } from '../Utils'
import LikePost from '../LikePost'
import DeletePost from '../DeletePost'
import CommentPost from '../CommentPost'
import {
  getPosts,
  updatePost,
  updatePostAdmin,
  updatePicturePost,
  updatePicturePostAdmin,
} from '../../actions/post.actions'
import DeletePostAdmin from '../DeletePostAdmin'

const CardHome = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdated, setIsUpdated] = useState(false)
  const [isUpdatedAdmin, setIsUpdatedAdmin] = useState(false)
  const [textUpdate, setTextUpdate] = useState(null)
  const [showComments, setShowComments] = useState(false)
  const [picture, setPicture] = useState()
  const [pictureAdmin, setPictureAdmin] = useState()
  const [file, setFile] = useState()
  const [open, setOpen] = useState(false)
  const usersData = useSelector((state) => state.usersReducer)
  const userData = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate))
    }
    setIsUpdated(false)
  }

  const updateItemAdmin = () => {
    if (textUpdate) {
      dispatch(updatePostAdmin(post._id, textUpdate))
    }
    setIsUpdatedAdmin(false)
  }

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false)
  }, [usersData])

  const handleSetPicture = async () => {
    const data = new FormData()
    data.append('posterId', userData._id)
    data.append('id', post._id)
    data.append('file', file)

    await dispatch(updatePicturePost(data, post._id))
    dispatch(getPosts())
  }

  const handlePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  const handleSetPictureAdmin = async () => {
    const data = new FormData()
    data.append('id', post._id)
    data.append('file', file)

    await dispatch(updatePicturePostAdmin(data, post._id))
    dispatch(getPosts())
  }

  const handlePictureAdmin = (e) => {
    setPictureAdmin(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  return (
    <li className="card_home" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <Fragment>
          <div className="card_home_left">
            <Link to={`/wall?id=${post.posterId}`}>
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === post.posterId) return user.picture
                      else return null
                    })
                    .join('')
                }
                alt="poster-pic"
              />
            </Link>
          </div>
          <div className="card_home_right">
            <div className="card_home_right_header">
              <div className="card_home_right_header--name">
                <Link to={`/wall?id=${post.posterId}`}>
                  <h3>
                    {!isEmpty(usersData[0]) &&
                      usersData
                        .map((user) => {
                          if (user._id === post.posterId) return user.firstname
                          else return null
                        })
                        .join('')}
                  </h3>
                </Link>
                <Link to={`/wall?id=${post.posterId}`}>
                  <h3 className="margin">
                    {!isEmpty(usersData[0]) &&
                      usersData
                        .map((user) => {
                          if (user._id === post.posterId) return user.lastname
                          else return null
                        })
                        .join('')}
                  </h3>
                </Link>
              </div>

              <span>{dateParser(post.createdAt)}</span>
            </div>
            {userData._id === post.posterId && (
              <div className="dropdown_section">
                <div className="dropdown" id={`dropdown-isAdmin`}>
                  <div className="dropdown_header">
                    <a
                      className={`dropdown_fleche ${open}`}
                      href={`#dropdown-isAdmin`}
                      onClick={() => setOpen(!open)}
                    >
                      <img
                        src="./img/icons/point.svg"
                        alt="Ouvrir cette liste"
                      />
                    </a>
                  </div>
                  {open && (
                    <div className="margin-bottom">
                      <div className="button-container">
                        <div
                          onClick={() => {
                            setIsUpdated(!isUpdated)
                            setOpen(!open)
                          }}
                        >
                          <img src="./img/icons/edit.svg" alt="edit" />
                        </div>
                        <div className="button-container">
                          <img src="./img/icons/picture.svg" alt="img" />
                          <input
                            type="file"
                            id="file-upload"
                            name="file"
                            accept=".jpg, .jpeg, .png, .gif"
                            onChange={(e) => handlePicture(e)}
                          />
                        </div>
                        <DeletePost id={post._id} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {isUpdated === false && isUpdatedAdmin === false && (
              <p>{post.message}</p>
            )}
            {isUpdated && (
              <div className="update_post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button_container">
                  <button className="btn" onClick={updateItem}>
                    Valider
                  </button>
                </div>
              </div>
            )}
            {isUpdatedAdmin && (
              <div className="update_post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button_container">
                  <button className="btn" onClick={updateItemAdmin}>
                    Valider
                  </button>
                </div>
              </div>
            )}
            <div className="relative">
              {post.picture && (
                <img src={post.picture} alt="card-pic" className="card_pic" />
              )}
            </div>
            {picture ? (
              <div className="update_post">
                <div className="button_container_picture">
                  <h3>Aperçu de la nouvelle photo du post ci-dessous</h3>
                  <img className="card_pic" src={picture} alt="ImageUser" />
                  <div className="max-width">
                    <button
                      className="btn"
                      onClick={() => {
                        handleSetPicture()
                        setPicture(!picture)
                      }}
                    >
                      Envoyer
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {pictureAdmin ? (
              <div className="update_post">
                <div className="button_container_picture">
                  <h3>Aperçu de la nouvelle photo du post ci-dessous</h3>
                  <img
                    className="card_pic"
                    src={pictureAdmin}
                    alt="ImageUser"
                  />
                  <div className="max-width">
                    <button
                      className="btn"
                      onClick={() => {
                        handleSetPictureAdmin()
                        setPictureAdmin(!pictureAdmin)
                      }}
                    >
                      Envoyer
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {userData.isAdmin && (
              <div className="button-container">
                <div onClick={() => setIsUpdatedAdmin(!isUpdatedAdmin)}>
                  <img src="./img/icons/edit.svg" alt="edit" />
                </div>
                <div className="button-container">
                  <img src="./img/icons/picture.svg" alt="img" />
                  <input
                    type="file"
                    id="file-upload"
                    name="file"
                    accept=".jpg, .jpeg, .png, .gif"
                    onChange={(e) => handlePictureAdmin(e)}
                  />
                </div>
                <DeletePostAdmin id={post._id} />
              </div>
            )}
            <div className="card_footer">
              <div className="card_footer_comment">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="./img/icons/message1.svg"
                  alt="comment"
                />
                <span>{post.comments.length}</span>
              </div>
              <LikePost post={post} />
            </div>
            {showComments && <CommentPost post={post} />}
          </div>
        </Fragment>
      )}
    </li>
  )
}

export default CardHome
