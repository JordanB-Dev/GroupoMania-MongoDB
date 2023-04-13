import axios from 'axios'

// posts
export const GET_POSTS = 'GET_POSTS'
export const ADD_POST = 'ADD_POST'
export const LIKE_POST = 'LIKE_POST'
export const UNLIKE_POST = 'UNLIKE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const UPDATE_POST_ADMIN = 'UPDATE_POST_ADMIN'
export const UPDATE_PICTURE_POST = 'UPDATE_PICTURE_POST'
export const UPDATE_PICTURE_POST_ADMIN = 'UPDATE_PICTURE_POST_ADMIN'
export const DELETE_POST = 'DELETE_POST'
export const DELETE_POST_ADMIN = 'DELETE_POST_ADMIN'

//comment
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const DELETE_COMMENT_ADMIN = 'DELETE_COMMENT_ADMIN'

export const getPosts = (num) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}api/post/`,
        withCredentials: true,
      })
      const array = res.data.slice(0, num)
      dispatch({ type: GET_POSTS, payload: array })
    } catch (err) {
      return console.log(err)
    }
  }
}

export const addPost = (data) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}api/post/`,
        data,
        withCredentials: true,
      })
      dispatch({ type: ADD_POST, payload: { data } })
    } catch (err) {
      return console.log(err)
    }
  }
}

export const likePost = (postId, userId) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'patch',
        url: `${process.env.REACT_APP_API_URL}api/post/like/` + postId,
        data: { id: userId },
        withCredentials: true,
      })
      dispatch({ type: LIKE_POST, payload: { postId, userId } })
    } catch (err) {
      return console.log(err)
    }
  }
}

export const unlikePost = (postId, userId) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'patch',
        url: `${process.env.REACT_APP_API_URL}api/post/unlike/` + postId,
        data: { id: userId },
        withCredentials: true,
      })
      dispatch({ type: UNLIKE_POST, payload: { postId, userId } })
    } catch (err) {
      return console.log(err)
    }
  }
}

export const updatePost = (postId, message) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
        withCredentials: true,
        data: { message },
      })
      dispatch({ type: UPDATE_POST, payload: { message, postId } })
    } catch (err) {
      return console.log(err)
    }
  }
}

export const updatePostAdmin = (postId, message) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}api/admin/post/${postId}`,
        withCredentials: true,
        data: { message },
      })
      dispatch({ type: UPDATE_POST_ADMIN, payload: { message, postId } })
    } catch (err) {
      return console.log(err)
    }
  }
}

export const updatePicturePost = (data, id) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}api/post/${id}`,
        withCredentials: true,
        data,
      })
      dispatch({ type: UPDATE_PICTURE_POST, payload: { data } })
    } catch (error) {
      console.log(error)
    }
  }
}

export const updatePicturePostAdmin = (data, id) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}api/admin/post/${id}`,
        withCredentials: true,
        data,
      })
      dispatch({ type: UPDATE_PICTURE_POST_ADMIN, payload: { data } })
    } catch (error) {
      console.log(error)
    }
  }
}

export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'delete',
        url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
        withCredentials: true,
      })
      dispatch({ type: DELETE_POST, payload: { postId } })
    } catch (err) {
      return console.log(err)
    }
  }
}

export const deletePostAdmin = (postId) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'delete',
        url: `${process.env.REACT_APP_API_URL}api/admin/post/${postId}`,
        withCredentials: true,
      })
      dispatch({ type: DELETE_POST_ADMIN, payload: { postId } })
    } catch (err) {
      return console.log(err)
    }
  }
}

export const addComment = (postId, commenterId, text) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'patch',
        url: `${process.env.REACT_APP_API_URL}api/post/comment/${postId}`,
        data: { commenterId, text },
        withCredentials: true,
      })
      dispatch({ type: ADD_COMMENT, payload: { postId } })
    } catch (err) {
      return console.log(err)
    }
  }
}

export const editComment = (postId, commentId, text) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'patch',
        url: `${process.env.REACT_APP_API_URL}api/post/comment-edit/${postId}`,
        data: { commentId, text },
        withCredentials: true,
      })
      dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } })
    } catch (err) {
      return console.log(err)
    }
  }
}

export const deleteComment = (postId, commentId) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'patch',
        url: `${process.env.REACT_APP_API_URL}api/post/comment-delete/${postId}`,
        data: { commentId },
        withCredentials: true,
      })
      dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } })
    } catch (err) {
      return console.log(err)
    }
  }
}

export const deleteCommentAdmin = (postId, commentId) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'patch',
        url: `${process.env.REACT_APP_API_URL}api/admin/comment-delete/${postId}`,
        data: { commentId },
        withCredentials: true,
      })
      dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } })
    } catch (err) {
      return console.log(err)
    }
  }
}
