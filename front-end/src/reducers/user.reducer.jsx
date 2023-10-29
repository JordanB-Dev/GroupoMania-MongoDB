import {
  GET_USER,
  UPLOAD_PICTURE,
  UPDATE_PICTURE_ADMIN,
  UPDATE_BIO,
  UPDATE_BIO_ADMIN,
  UPDATE_FIRSTNAME,
  UPDATE_FIRSTNAME_ADMIN,
  UPDATE_LASTNAME,
  UPDATE_LASTNAME_ADMIN,
  UPDATE_EMAIL,
  UPDATE_EMAIL_ADMIN,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_ADMIN,
  DISABLED_ACCOUNT,
  ACTIVE_ACCOUNT,
  BAN_ACCOUND_ADMIN,
  UNBAN_ACCOUND_ADMIN,
} from '../actions/user.actions'

const initialState = {}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload
    case UPLOAD_PICTURE:
      return {
        ...state,
        picture: action.payload,
      }
    case UPDATE_PICTURE_ADMIN:
      return {
        ...state,
        picture: action.payload,
      }
    case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload,
      }
    case UPDATE_BIO_ADMIN:
      return {
        ...state,
        bio: action.payload,
      }
    case UPDATE_FIRSTNAME:
      return {
        ...state,
        firstname: action.payload,
      }
    case UPDATE_FIRSTNAME_ADMIN:
      return {
        ...state,
        firstname: action.payload,
      }
    case UPDATE_LASTNAME:
      return {
        ...state,
        lastname: action.payload,
      }
    case UPDATE_LASTNAME_ADMIN:
      return {
        ...state,
        lastname: action.payload,
      }
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload,
      }
    case UPDATE_EMAIL_ADMIN:
      return {
        ...state,
        email: action.payload,
      }
    case UPDATE_PASSWORD:
      return {
        ...state,
        password: action.payload,
      }
    case UPDATE_PASSWORD_ADMIN:
      return {
        ...state,
        password: action.payload,
      }
    case DISABLED_ACCOUNT:
      return state.filter((user) => user._id !== action.payload.id)
    case ACTIVE_ACCOUNT:
      return state.filter((user) => user._id !== action.payload.id)
    case BAN_ACCOUND_ADMIN:
      return {
        ...state,
        isBan: action.payload,
      }
    case UNBAN_ACCOUND_ADMIN:
      return {
        ...state,
        isBan: action.payload,
      }
    default:
      return state
  }
}
