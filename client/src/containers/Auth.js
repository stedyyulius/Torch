import React, { Component } from 'react'
import Facebook from '../components/Facebook'

import '../styles/Auth.css'

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