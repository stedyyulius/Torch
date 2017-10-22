import React, {Component} from 'react'
import { icon } from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import axios from 'axios'
import { connect } from 'react-redux'
import cookie from 'react-cookies'

import { getRooms } from '../actions/index'
import { api } from '../config'

const Current = [-6.260708, 106.781617];

var Activity = icon({
    iconUrl: 'https://i.imgur.com/EBgsrAe.png',
    iconSize: [70, 70],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

var Me = icon({
    iconUrl: 'https://i.imgur.com/zwHU1wU.png',
    iconSize: [130, 130],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

class TorchMap extends Component {
  constructor(props){
    super(props)
    this.state={
      rooms:[],
      komsel: [],
      isJoin: ''
    }
  }
  
  componentWillMount(){
    this.props.getRooms()
    axios.get(`${api}/komsel`)
    .then(res=>{
      console.log(res);
      this.setState({
        komsel: res.data
      })
    })
  }
  
  requestJoin(id,i){
    console.log(id);
    let data = {
      name: cookie.load('user').name
    }
    console.log(data);
    axios.post(`${api}/request/komsel/join/${id}`,data)
    .then(response=>{
      console.log(response);
      axios.get(`${api}/komsel`)
      .then(res=>{
        console.log(res);
        this.setState({
          komsel: res.data,
          isJoin: i
        })
      })
    })
  }

  render(){
    return(
      <div>      
        <Map center={Current} zoom={16}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker 
            position={[+Current[0],+Current[1]]}
            icon={Me}>
         </Marker>
         <div className="tooltip-detail">
         {(this.props.isKomsel && this.state.komsel.length > 0)
           ?  (this.state.komsel.map((k,i)=>
              <Marker
                key={i} 
                position={[+k.location.lat,+k.location.lng]}
                icon={icon({
                    iconUrl: k.map_image,
                    iconSize: [70, 70],
                    iconAnchor: [22, 94],
                    popupAnchor: [-3, -76],
                    shadowSize: [68, 95],
                    shadowAnchor: [22, 94]
                })}>
                <Popup>
                  <span>
                    <span className="tooltip-detail">{k.poin} </span><br />
                    <b className="tooltip-detail">{k.name}</b> <br />
                    <img className="komsel tooltip-detail" src={k.image} /> <br />
                    <span className="tooltip-detail">{k.theme}</span><br />
                    <span className="tooltip-detail">{k.ayat}</span>
                    <hr />
                    <span className="leader">{k._leader.name}</span>
                      {(k.member.length === 0)
                        ? (<b>No Member Yet</b>)
                        : (k.member.map((m,index)=>
                          <div key={index}><b>{m._member.name}</b><br /></div>
                        ))
                      }      
                    <hr />
                    {(this.state.isJoin === i)
                      ? null
                      : <button className="btn btn-success tooltip-detail" onClick={()=> this.requestJoin(k._id,i)}>Join</button>
                    }
                  </span>
                </Popup>
             </Marker>  
            ))
           : null
         }    
       </div>    
        {(this.props.rooms && this.props.isActive === true)
         ?this.props.rooms.map((m,index) => (
           <Marker
             key={index} 
             position={[+m.rules.offline.location.lat,+m.rules.offline.location.lng]}
             icon={Activity}>
            <Popup>
              <span>
                <b className="tooltip-detail">{m.name}</b>
                <br />
                <span className="tooltip-detail">{m.createdDate}</span> <hr />
                <img className="activity-pic tooltip-detail" src={m.image} /><br />
                <button className="btn btn-success tooltip-detail">Join</button>
              </span>
            </Popup>
          </Marker>          
        ))
        :<div></div>
      }
    </Map>
  </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    rooms: state.rooms,
    isActive: state.isActive,
    isKomsel: state.isKomsel
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    getRooms: () => dispatch(getRooms())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TorchMap)