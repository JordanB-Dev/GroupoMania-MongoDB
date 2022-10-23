import { useDispatch } from 'react-redux'
import { deletePost } from '../../actions/post.actions'

const DeletePost = (props) => {
  const dispatch = useDispatch()

  const deleteQuote = () => dispatch(deletePost(props.id))

  return (
    <div
      onClick={() => {
        if (window.confirm('Voulez-vous supprimer ce post ?')) {
          deleteQuote()
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="trash" />
    </div>
  )
}

export default DeletePost
