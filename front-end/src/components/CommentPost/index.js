import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, getPosts } from '../../actions/post.actions'
import { isEmpty, timestampParser } from '../Utils'
import EditDeleteComment from '../EditDeleteComment'

const CommentPost = ({ post }) => {
  const [comment, setComment] = useState('')
  const usersData = useSelector((state) => state.usersReducer)
  const userData = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()

  const handleComment = (e) => {
    e.preventDefault()

    if (comment) {
      dispatch(
        addComment(
          post._id,
          userData._id,
          comment,
          userData.firstname,
          userData.lastname
        )
      )
        .then(() => dispatch(getPosts()))
        .then(() => setComment(''))
    }
  }

  return (
    <div className="comments_container">
      {post.comments.map((comment) => {
        return (
          <div
            className={
              comment.commenterId === userData._id
                ? 'comment client'
                : 'comment'
            }
            key={comment._id}
          >
            <div className="left_part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === comment.commenterId) return user.picture
                      else return null
                    })
                    .join('')
                }
                alt="commenter-pic"
              />
            </div>
            <div className="right_part">
              <div className="comment_header">
                <div className="pseudo ">
                  <h3>
                    {!isEmpty(usersData[0]) &&
                      usersData
                        .map((user) => {
                          if (user._id === comment.commenterId)
                            return user.firstname
                          else return null
                        })
                        .join('')}
                  </h3>
                  <h3 className="margin">
                    {' '}
                    {!isEmpty(usersData[0]) &&
                      usersData
                        .map((user) => {
                          if (user._id === comment.commenterId)
                            return user.lastname
                          else return null
                        })
                        .join('')}
                  </h3>
                </div>
                <span>{timestampParser(comment.timestamp)}</span>
              </div>
              <p>{comment.text}</p>
              <EditDeleteComment comments={comment} postId={post._id} />
            </div>
          </div>
        )
      })}
      {userData._id && (
        <form action="" onSubmit={handleComment} className="comment_form">
          <input
            type="text"
            name="text"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="Laisser un commentaire"
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  )
}

export default CommentPost
