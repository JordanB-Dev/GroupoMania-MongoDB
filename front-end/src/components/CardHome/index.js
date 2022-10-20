import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { dateParser, isEmpty } from '../Utils'
import LikePost from '../LikePost'

const CardHome = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdated, setIsUpdated] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [open, setOpen] = useState(false)
  const usersData = useSelector((state) => state.usersReducer)
  const userData = useSelector((state) => state.userReducer)

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false)
  }, [usersData])

  return (
    <li className="card_home" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <Fragment>
          <div className="card_home_left">
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
          </div>
          <div className="card_home_right">
            <div className="card_home_right_header">
              <div className="card_home_right_header--name">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.posterId) return user.firstname
                        else return null
                      })
                      .join('')}
                </h3>

                <h3 className="margin">
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.posterId) return user.lastname
                        else return null
                      })
                      .join('')}
                </h3>
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
                    <>
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
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            <p>{post.message}</p>

            <div className="relative">
              {post.picture && (
                <img src={post.picture} alt="card-pic" className="card_pic" />
              )}
            </div>

            <div className="card_footer">
              <div className="card_footer_comment">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="./img/icons/message1.svg"
                  alt="comment"
                />
                <span> </span>
              </div>
              <LikePost post={post} />
            </div>
          </div>
        </Fragment>
      )}
    </li>
  )
}

export default CardHome
