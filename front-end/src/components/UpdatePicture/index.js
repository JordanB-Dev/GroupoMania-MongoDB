import { useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadPicture } from '../../actions/user.actions'

const UpdatePicture = () => {
  const [picture, setPicture] = useState()
  const [file, setFile] = useState()
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.userReducer)

  const handleSetPicture = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('userId', userData._id)
    data.append('file', file)

    dispatch(uploadPicture(data, userData._id))
  }

  const handlePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  return (
    <Fragment>
      {picture ? (
        <>
          <h3>Aperçu de la nouvelle photo de profil ci-dessous</h3>
          <img className="img-visu" src={picture} alt="ImageUser" />
        </>
      ) : null}
      <form action="" onSubmit={handleSetPicture} className="upload-pic">
        <label htmlFor="file">Changer d'image</label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".jpg, .jpeg, .png, .gif"
          onChange={(e) => handlePicture(e)}
        />
        <br />
        <input type="submit" value="Envoyer" />
      </form>
    </Fragment>
  )
}

export default UpdatePicture
