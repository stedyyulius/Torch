import React, { Component } from 'react'
import Facebook from '../components/Facebook'

class Auth extends Component{
  constructor(props){
    super(props)
    this.state={}
  }
  render(){
    return(
      <div>
        <Facebook />
      </div>
    )
  }
}

export default Auth