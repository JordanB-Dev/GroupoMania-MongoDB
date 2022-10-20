import { useContext, useState, useEffect } from 'react'
import { UidContext } from '../AppContext'
import { useDispatch } from 'react-redux'
import { getPosts, likePost, unlikePost } from '../../actions/post.actions'

const LikePost = ({ post }) => {
  const [liked, setLiked] = useState(false)
  const uid = useContext(UidContext)
  const dispatch = useDispatch()

  const like = () => {
    dispatch(likePost(post._id, uid))
    dispatch(getPosts())
    setLiked(true)
  }

  const unlike = () => {
    dispatch(unlikePost(post._id, uid))
    dispatch(getPosts())
    setLiked(false)
  }

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true)
    else setLiked(false)
  }, [uid, post.likers, liked])

  return (
    <div className="card_footer_like">
      {uid && liked === false && (
        <img src="./img/icons/heart.svg" onClick={like} alt="like" />
      )}
      {uid && liked && (
        <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
      )}
      <span>{post.likers.length}</span>
    </div>
  )
}

export default LikePost
