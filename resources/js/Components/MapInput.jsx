import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- Subcomponente para manejar el clic ---
function LocationMarker({ position, onLocationChange }) {
    useMapEvents({
        click(e) {
            onLocationChange(e.latlng);
        },
    });

    return position === null ? null : <Marker position={position}></Marker>;
}

// --- Subcomponente para mover el mapa cuando cambia la posición inicial ---
function MapUpdater({ position }) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            // Si tenemos posición, centramos el mapa ahí y hacemos un poco de zoom
            map.setView(position, 13);
        }
    }, [position, map]);
    return null;
}

// --- Componente Principal ---
export default function MapInput({ onChange, defaultPosition = null }) {
    const [position, setPosition] = useState(defaultPosition);

    // Centro por defecto si no hay geolocalización (Mataró)
    const defaultCenter = [41.5381, 2.4445];

    const handleLocationChange = (newPosition) => {
        setPosition(newPosition);
        if (onChange) {
            onChange(newPosition);
        }
    };

    const trobam = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (geoPosition) => {
                    const lat = geoPosition.coords.latitude;
                    const lng = geoPosition.coords.longitude;

                    const newLocation = { lat: lat, lng: lng };

                    handleLocationChange(newLocation);
                },
                (error) => {
                    console.warn("L'usuari ha denegat la geolocalització o hi ha un error.");
                }
            );
        } else {
            console.warn("El teu navegador no suporta geolocalització.");
        }
    };

    return (
        <>
            <button
                type="button" // IMPORTANTE: type="button" para que no envíe el formulario al pulsarlo
                onClick={trobam}
                className="mb-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                📍 Troba'm
            </button>
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
                    // Usamos la posición si existe, si no el centro por defecto
                    center={position || defaultCenter}
                    zoom={position ? 13 : 5}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <LocationMarker position={position} onLocationChange={handleLocationChange} />
                    <MapUpdater position={position} />
                </MapContainer>
            </div>
        </>
    );
}