import axios from 'axios'

// posts
export const GET_POSTS = 'GET_POSTS'
export const ADD_POST = 'ADD_POST'
export const LIKE_POST = 'LIKE_POST'
export const UNLIKE_POST = 'UNLIKE_POST'

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
