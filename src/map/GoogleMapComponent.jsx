import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { restaurants } from "../data/restaurantData/data";
import { useNavigate } from "react-router-dom";


const containerStyle = {
width: "100%",
height: "350px",
borderRadius: "15px",
overflow: "hidden",
};


function GoogleMapComponent() {
const navigate = useNavigate();
const [center, setCenter] = useState({ lat: 24.8607, lng: 67.0011 });


// "Find Near Me"
const findNearMe = () => {
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition((pos) => {
setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
});
}
};


return (
<div>
<button
style={{
padding: "10px 20px",
marginBottom: "10px",
borderRadius: "20px",
background: "#ff0066",
color: "#fff",
border: "none",
cursor: "pointer",
}}
onClick={findNearMe}
>
Find Near Me
</button>


<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
{restaurants.map((rest) => (
<Marker
key={rest.id}
position={{ lat: rest.lat, lng: rest.lng }}
onClick={() => navigate(`/restaurant/${rest.id}`)}
/>
))}
</GoogleMap>
</LoadScript>
</div>
);
}


export default GoogleMapComponent;