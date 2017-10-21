import { combineReducers } from 'redux';

import isCheck from './isCheck'
import rooms from './rooms'

export default combineReducers({
  isCheck: isCheck,
  rooms: rooms
})