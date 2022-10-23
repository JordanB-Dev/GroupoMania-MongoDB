import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteComment,
  deleteCommentAdmin,
  editComment,
  getPosts,
} from '../../actions/post.actions'
import { UidContext } from '../AppContext'

const EditDeleteComment = ({ comments, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false)
  const [edit, setEdit] = useState(false)
  const [comment, setComment] = useState('')
  const userData = useSelector((state) => state.userReducer)
  const uid = useContext(UidContext)
  const dispatch = useDispatch()

  const handleEdit = (e) => {
    e.preventDefault()

    if (comment) {
      dispatch(editComment(postId, comments._id, comment))
      setComment('')
      setEdit(false)
    }
  }

  const handleDelete = () => {
    dispatch(deleteComment(postId, comments._id))
    dispatch(getPosts())
  }

  const handleDeleteAdmin = () => {
    dispatch(deleteCommentAdmin(postId, comments._id))
    dispatch(getPosts())
  }

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comments.commenterId) {
        setIsAuthor(true)
      }
    }
    checkAuthor()
  }, [uid, comments.commenterId])

  return (
    <div className="comment_edit">
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="comment_edit" />
        </span>
      )}
      {userData.isAdmin && edit === false && (
        <div
          onClick={() => {
            if (window.confirm('Voulez-vous supprimer ce post ?')) {
              handleDeleteAdmin()
            }
          }}
        >
          <img src="./img/icons/trash.svg" alt="trash" />
        </div>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="comment_edit--form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Editer
          </label>
          <br />
          <textarea
            type="text"
            name="text"
            onChange={(e) => setComment(e.target.value)}
            defaultValue={comments.text}
          />
          <br />

          <div className="btn-delete">
            <span
              onClick={() => {
                if (window.confirm('Voulez-vous supprimer ce commentaire ?')) {
                  handleDelete()
                }
              }}
            >
              <img src="./img/icons/trash.svg" alt="delete" />
            </span>
          </div>
          <div className="btn">
            <input type="submit" value="Valider" />
          </div>
        </form>
      )}
    </div>
  )
}

export default EditDeleteComment
