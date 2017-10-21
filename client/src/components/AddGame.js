import React from 'react'
import axios from 'axios'
import Countries from 'countries-cities'
import GoogleMapReact from 'google-map-react'
import geocoder from 'geocoder'

class AddGame extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      access: null,
      category: null,
      cities: [],
      lat: -6.260708,
      lng: 106.781617,
      zoom: 17,
    }
  }

  componentWillMount () {
    let cities = Countries.getCities('indonesia')
    this.setState({
      cities:cities
    })
  }
  
  getDot(e){
    this.setState({
      lat: e.lat,
      lng: e.lng
    })
  }

  getLocation(loc){
  geocoder.geocode(loc,(err,data)=>{
    console.log(data);
    if(typeof data !== "undefined" && data.status === 'OK'){
      this.setState({
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng
      })
    } else {
      return (<h6>no result found</h6>)
    }
  })
  }

  render () {
    return (
      
<div className="modal" id="AddGame" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
<div className="modal-dialog">
  <div className="modal-content">
    <div className="modal-header">
      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
      <h4 className="modal-title" id="myModalLabel">Add User</h4>
    </div>
    <div className="modal-body">
      <form>
<div className="form-group">
  <label htmlFor="exampleInputEmail1">Email address</label>
  <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
</div>
<div className="form-group">
  <label htmlFor="exampleInputPassword1">Password</label>
  <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
</div>
<div className="form-group">
  <label htmlFor="exampleInputFile">File input</label>
  <input type="file" id="exampleInputFile" />
  <p className="help-block">Example block-level help text here.</p>
</div>
<div className="form-group">
  <GoogleMapReact
      style={{width:50, height:250,margin:10}}
      center={{lat: this.state.lat, lng: this.state.lng}}
      zoom={this.state.zoom}
      onClick={(e)=> this.getDot(e)}
    >
     <input
       type='text'
       onChange={(e)=> this.getLocation(e.target.value)}
       />
     <img
       style={{width:20,height:20}}
       lat={this.state.lat}
       lng={this.state.lng}
       src='http://www.clker.com/cliparts/l/a/V/x/F/r/house-icon-dark-green-hi.png'
       alt="icon-home"
     />
   </GoogleMapReact>
</div>
<div className="checkbox">
  <label>
    <input type="checkbox" /> Check me out
  </label>
</div>
</form>
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
      <button type="button" className="btn btn-primary">Save changes</button>
    </div>
  </div>
</div>
</div>
    )
  }
}

export default AddGame