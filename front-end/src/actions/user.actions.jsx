import axios from 'axios'

export const GET_USER = 'GET_USER'
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE'
export const UPDATE_PICTURE_ADMIN = 'UPDATE_PICTURE_ADMIN'
export const UPDATE_BIO = 'UPDATE_BIO'
export const UPDATE_BIO_ADMIN = 'UPDATE_BIO_ADMIN'
export const UPDATE_FIRSTNAME = 'UPDATE_FIRSTNAME'
export const UPDATE_FIRSTNAME_ADMIN = 'UPDATE_FIRSTNAME_ADMIN'
export const UPDATE_LASTNAME = 'UPDATE_LASTNAME'
export const UPDATE_LASTNAME_ADMIN = 'UPDATE_LASTNAME_ADMIN'
export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_EMAIL_ADMIN = 'UPDATE_EMAIL_ADMIN'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const UPDATE_PASSWORD_ADMIN = 'UPDATE_PASSWORD_ADMIN'
export const DISABLED_ACCOUNT = 'DELETE_ACCOUNT'
export const ACTIVE_ACCOUNT = 'ACTIVE_ACCOUNT'
export const BAN_ACCOUND_ADMIN = 'BAN_ACCOUND_ADMIN'
export const UNBAN_ACCOUND_ADMIN = 'UNBAN_ACCOUND_ADMIN'

export const getUser = (uid) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
        withCredentials: true,
      })
      dispatch({ type: GET_USER, payload: res.data })
    } catch (err) {
      return console.log(err)
    }
  }
}

export const uploadPicture = (data, id) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}api/user/upload`,
        withCredentials: true,
        data,
      })
      const res = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
        withCredentials: true,
      })
      dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture })
    } catch (error) {
      console.log(error)
    }
  }
}

export const uploadPictureAdmin = (id) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}api/admin/user/${id}`,
        withCredentials: true,
      })
      dispatch({ type: UPDATE_PICTURE_ADMIN, payload: { id } })
    } catch (error) {
      return console.log(error)
    }
  }
}

export const updateBio = (id, bio) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
        withCredentials: true,
        data: { bio },
      })
      dispatch({ type: UPDATE_BIO, payload: bio })
    } catch (err) {
      return console.log(err)
    }
  }
}

export const updateBioAdmin = (id, bio) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}api/admin/user/${id}`,
        withCredentials: true,
        data: { bio },
      })
      dispatch({ type: UPDATE_BIO_ADMIN, payload: bio })
    } catch (err) {
      return console.log(err)
    }
  }
}

export const updateFirstName = (id, firstname) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
        withCredentials: true,
        data: { firstname },
      })
      dispatch({ type: UPDATE_FIRSTNAME, payload: firstname })
    } catch (err) {
      return console.log(err)
    }
  }
}

export const updateFirstNameAdmin = (id, firstname) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}api/admin/user/${id}`,
        withCredentials: true,
        data: { firstname },
      })
      dispatch({ type: UPDATE_FIRSTNAME_ADMIN, payload: firstname })
    } catch (err) {
      return console.log(err)
    }
  }
}

export const updateLastName = (id, lastname) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
        withCredentials: true,
        data: { lastname },
      })
      dispatch({ type: UPDATE_LASTNAME, payload: lastname })
    } catch (err) {
      return console.log(err)
    }
  }
}

export const updateLastNameAdmin = (id, lastname) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}api/admin/user/${id}`,
        withCredentials: true,
        data: { lastname },
      })
      dispatch({ type: UPDATE_LASTNAME_ADMIN, payload: lastname })
    } catch (err) {
      return console.log(err)
    }
  }
}

export const updateEmail = (id, email) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
        withCredentials: true,
        data: { email },
      })
      dispatch({ type: UPDATE_EMAIL, payload: email })
    } catch (err) {
      return console.log(err)
    }
  }
}

export const updateEmailAdmin = (id, email) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}api/admin/user/${id}`,
        withCredentials: true,
        data: { email },
      })
      dispatch({ type: UPDATE_EMAIL_ADMIN, payload: email })
    } catch (err) {
      return console.log(err)
    }
  }
}

export const updatePassword = (id, password) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'patch',
        url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
        withCredentials: true,
        data: { password },
      })
      dispatch({ type: UPDATE_PASSWORD, payload: password })
    } catch (err) {
      return console.log(err)
    }
  }
}

export const updatePasswordAdmin = (id, password) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'patch',
        url: `${process.env.REACT_APP_API_URL}api/admin/user/${id}`,
        withCredentials: true,
        data: { password },
      })
      dispatch({ type: UPDATE_PASSWORD_ADMIN, payload: password })
    } catch (err) {
      return console.log(err)
    }
  }
}

export const disabledAccound = (id) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}api/user/disabled/${id}`,
        withCredentials: true,
      })
      dispatch({ type: DISABLED_ACCOUNT, payload: { id } })
    } catch (error) {
      return console.log(error)
    }
  }
}

export const activeAccound = (id) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}api/user/active/${id}`,
        withCredentials: true,
      })
      dispatch({ type: ACTIVE_ACCOUNT, payload: { id } })
    } catch (error) {
      return console.log(error)
    }
  }
}

export const banAccound = (id) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}api/admin/user/ban/${id}`,
        withCredentials: true,
      })
      dispatch({ type: BAN_ACCOUND_ADMIN, payload: { id } })
    } catch (error) {
      return console.log(error)
    }
  }
}

export const unBanAccound = (id) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}api/admin/user/unban/${id}`,
        withCredentials: true,
      })
      dispatch({ type: UNBAN_ACCOUND_ADMIN, payload: { id } })
    } catch (error) {
      return console.log(error)
    }
  }
}
