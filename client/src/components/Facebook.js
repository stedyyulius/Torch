import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';

class Facebook extends Component{
  constructor(props){
    super(props)
    this.state={}
  }  
  responseFacebook(response) {
     console.log(response);
   }
  render(){
    return(
      <FacebookLogin
         appId="244681202728125"
         autoLoad={true}
         fields="name,email,picture"
         scope="public_profile,user_friends,user_actions.books"
         callback={this.responseFacebook}
       />
    )
  }
}

export default Facebook