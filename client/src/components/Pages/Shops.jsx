// src/components/Pages/Shops.jsx
import React, { useState, useCallback, useRef } from "react";
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    useLoadScript,
} from "@react-google-maps/api";

const shops = [
    {
        id: 1,
        name: "Kuchaman Branch 1",
        location: { lat: 27.1472, lng: 74.8560 }, // Based on: https://maps.app.goo.gl/M1deaMFvRRVrxqb99
    },
    {
        id: 2,
        name: "Makarana Branch 2",
        location: { lat: 27.0350, lng: 74.7114 }, // Based on: https://maps.app.goo.gl/UfYRTnD8zmZJskic6
    },
    {
        id: 3,
        name: "Borawar Branch 3",
        location: { lat: 27.0359, lng: 74.7065 }, // Based on: https://maps.app.goo.gl/Co3oB32WhvEh4G6D8
    },
    {
        id: 4,
        name: "Sabalpur Branch 4",
        location: { lat: 26.99926, lng: 74.63356 },
    },
    {
        id: 5,
        name:"Didwana Branch 5",
        location: { lat: 27.4041, lng: 74.5771 },
    }
];


const containerStyle = {
    width: "100%",
    height: "100%",
};

const center = shops[0].location;

export default function Shops() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const mapRef = useRef();
    const [selectedShop, setSelectedShop] = useState(null);
    const [directions, setDirections] = useState(null);

    const onLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const locateAndRoute = async (destination) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const origin = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                const directionsService = new window.google.maps.DirectionsService();
                const results = await directionsService.route({
                    origin,
                    destination,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                });
                setDirections(results);
            });
        } else {
            alert("Geolocation not supported by your browser.");
        }
    };

    if (!isLoaded) return <div>Loading Map...</div>;

    return (
        <div style={{ display: "flex" }} className="Shops">
            {/* Sidebar */}
            <div className="sidebar">
                <h3>Our Shops</h3>
                {shops.map((shop) => (
                    <div
                        className="sidebar-btn"
                        key={shop.id}
                        onClick={() => {
                            setSelectedShop(shop);
                            mapRef.current.panTo(shop.location);
                            locateAndRoute(shop.location);
                        }}
                    >
                        {shop.name}
                    </div>
                ))}
            </div>

            {/* Map */}
            <div className="map-container" style={{ flex: 1 }}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                    onLoad={onLoad}
                >
                    {shops.map((shop) => (
                        <Marker key={shop.id} position={shop.location} />
                    ))}
                    {directions && <DirectionsRenderer directions={directions} />}
                </GoogleMap>
            </div>
        </div>
    );
}
