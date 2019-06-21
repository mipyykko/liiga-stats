import { SET_HOVER_PLAYER } from '../actions'

const initialState = {
  id: null,
  hoverId: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_HOVER_PLAYER:
      return {
        ...state,
        hoverId: action.payload.id
      }
    default:
      return state
  }
}