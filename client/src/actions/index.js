import { api } from '../config'
import axios from 'axios'

const isCheck = (status) =>{
  console.log(status);
  return{
    type: 'isCheck',
    payload: status
  }
}

const getRooms = () =>{
  return(dispatch)=>{
    axios.get(`${api}/room/search/offline`)
    .then(res=>{
      console.log(res);
      dispatch({
        type: 'Rooms',
        payload: res.data
      })
    })
  }
}

const gameList = () =>{
  return(dispatch)=>{
    axios.get(`${api}/room/search/online`)
    .then(res=>{
      console.log(res.data);
      dispatch({
        type: 'Games',
        payload: res.data
      })
    })
  }
}

const getOneData = (data) =>{
  return{
    type: 'OneData',
    payload: data
  }
}
export{
  isCheck,
  getRooms,
  gameList,
  getOneData  
}
