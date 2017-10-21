const isCheck = (status) =>{
  console.log(status);
  return{
    type: 'isCheck',
    payload: status
  }
}

export{
  isCheck  
}
