import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// 1. Aquí importamos la hoja de estilos directamente desde node_modules
import 'leaflet/dist/leaflet.css';

// 2. IMPORTANTE: Arreglo para que se vea el icono de la chincheta (Leaflet tiene un bug visual con React/Vite)
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41] // Ajusta la punta de la chincheta al lugar exacto
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- Subcomponente para manejar el clic en el mapa ---
function LocationMarker({ position, onLocationChange }) {
    useMapEvents({
        click(e) {
            // e.latlng contiene { lat: número, lng: número }
            onLocationChange(e.latlng);
        },
    });

    return position === null ? null : <Marker position={position}></Marker>;
}

// --- Componente Principal ---
export default function MapInput({ onChange, defaultPosition = null }) {
    const [position, setPosition] = useState(defaultPosition);

    // Coordenadas iniciales donde centrar el mapa (ej. Madrid, o Mataró si prefieres: [41.5381, 2.4445])
    const center = [40.4168, -3.7038];

    const handleLocationChange = (newPosition) => {
        setPosition(newPosition);
        // Enviamos las coordenadas al componente padre (tu formulario)
        if (onChange) {
            onChange(newPosition);
        }
    };

    return (
        <div style={{
            width: '100%',
            height: '320px',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1.5px solid var(--warm-sand-darker)',
            position: 'relative',
            zIndex: 0
        }}>
            <MapContainer
                center={center}
                zoom={5}
                style={{ height: '100%', width: '100%' }}
            >
                {/* Estas son las "baldosas" de OpenStreetMap */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Nuestro manejador de clics y el marcador */}
                <LocationMarker position={position} onLocationChange={handleLocationChange} />
            </MapContainer>
        </div>
    );
}