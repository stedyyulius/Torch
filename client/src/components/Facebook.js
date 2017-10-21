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
      <div class="body">
    <div class="login-form">
      <div class="form-group logo">
          {/* <img width="150px" src="../assets/logo.png" /> */}
      </div>
       <div class="input form-group">
         <input type="text" class="form-control" placeholder="Username " id="UserName" />
         <i class="fa fa-user"></i>
       </div>
       <div class="form-group log-status">
         <input type="password" class="form-control" placeholder="Password" id="Passwod" />
         <i class="fa fa-lock"></i>
       </div>
       <FacebookLogin
          appId="244681202728125"
          autoLoad={true}
          fields="name,email,picture"
          scope="public_profile,user_friends,user_actions.books"
          callback={this.responseFacebook}
        />
       <button type="button" class="log-btn">Log in</button>
     </div>
   </div>
    )
  }
}

export default Facebook