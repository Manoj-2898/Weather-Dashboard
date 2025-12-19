import React, { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
})

function MapUpdater({ lat, lon }) {
  const map = useMap()
  useEffect(() => {
    map.setView([lat, lon], 10)
  }, [lat, lon, map])
  return null
}

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      onMapClick(lat, lng)
    }
  })
  return null
}

export default function MapView({ coords, onLocationClick }){
  if(!coords) return <div className="card">No location</div>
  const { lat, lon } = coords
  
  const handleMapClick = (lat, lng) => {
    if (onLocationClick) {
      onLocationClick(lat, lng)
    }
  }

  return (
    <div className="card">
      <h3 className="font-medium mb-3">Map <span className="text-xs text-gray-500">(Click to set location)</span></h3>
      <div style={{height:300}}>
        <MapContainer key={`${lat}-${lon}`} center={[lat, lon]} zoom={10} style={{height:'100%'}}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapUpdater lat={lat} lon={lon} />
          <MapClickHandler onMapClick={handleMapClick} />
          <Marker position={[lat, lon]}>
            <Popup>Current Location</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}
