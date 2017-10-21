import React, {Component} from 'react'
import { icon } from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import axios from 'axios'
import { connect } from 'react-redux'

import { getRooms } from '../actions/index'
import { api } from '../config'

const Current = [-6.260708, 106.781617];
var Activity = icon({
    iconUrl: 'https://i.imgur.com/EBgsrAe.png',
    iconSize: [30, 30],
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
      komsel: []
    }
  }
  
  componentDidMount(){
    axios.get(`${api}/komsel`)
    .then(res=>{
      this.setState({
        komsel: res.data
      })
    })
  }

  render(){
    return(
      <div>      
        <Map center={Current} zoom={15}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker 
            position={[+Current[0],+Current[1]]}
            icon={Me}>
         </Marker>
         {(this.state.komsel.map((k,i)=>
           <Marker 
             position={[+k.location.lat,+k.location.lng]}
             icon={icon({
                 iconUrl: k.image,
                 iconSize: [130, 130],
                 iconAnchor: [22, 94],
                 popupAnchor: [-3, -76],
                 shadowSize: [68, 95],
                 shadowAnchor: [22, 94]
             })}>
             <Popup>
               <span>
                 <p>{k.poin}</p>
                 <b>{k.name}</b>
                 <br />
                 <p>{k.theme}</p>
                 <p>{k.ayat}</p>
               </span>
             </Popup>
          </Marker>  
         ))}
        {(this.props.rooms)
         ?this.props.rooms.map((m,index) => (
           <Marker
             key={index} 
             position={[+m.rules.offline.location.lat,+m.rules.offline.location.lng]}
             icon={Activity}>
            <Popup>
              <span>
                <b>{m.name}</b>
                <br />
                <img src={m.image} />
              </span>
            </Popup>
          </Marker>          
        ))
        :<div></div>
      }
        {/* {(this.state.waze.length > 0 && this.state.wazeIcons === true)
         ?this.state.waze.map((w,index) => (
           <Marker
             key={index} 
             position={[w.location.y,w.location.x]}
             >
            <Popup>
              <span>
                <b>{w.street}</b>
                <br />
                {w.subtype}
              </span>
            </Popup>
          </Marker>          
        ))
        :<div></div>
      } */}
    </Map>
  </div>
    )
  }
  
  componentDidMount(){
    this.props.getRooms()
  }
}

const mapStateToProps = (state) =>{
  return{
    rooms: state.rooms
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    getRooms: () => dispatch(getRooms())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TorchMap)