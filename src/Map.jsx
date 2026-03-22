import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function ChangeView({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom]);

  return null;
}

function Map({ center = [20, 0], zoom = 2 }) {
  return (
    <div style={{ height: "400px", marginTop:"16px", padding:"1rem",borderRadius:"20px",boxShadow:"0 0 8px -4px rgba(0,0,0,0.5)"}}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
      >
        <ChangeView center={center} zoom={zoom} />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

export default Map;
