import { useDispatch } from 'react-redux'
import { deletePostAdmin } from '../../actions/post.actions'

const DeletePostAdmin = (props) => {
  const dispatch = useDispatch()

  const deleteQuote = () => dispatch(deletePostAdmin(props.id))

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

export default DeletePostAdmin
