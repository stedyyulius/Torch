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
    axios.get(`${api}/room`)
    .then(res=>{
      console.log(res);
      dispatch({
        type: 'Rooms',
        payload: res.data
      })
    })
  }
}

export{
  isCheck,
  getRooms  
}
