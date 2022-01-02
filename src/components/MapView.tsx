import { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import useUser from "../hooks/useUser";
import { FaMapMarkerAlt } from "react-icons/fa";

const MapView = () => {
  const { mapInfoData } = useUser();

  const [defaultcenter, setcdefaultenter] = useState({
    lat: 37.7749295,
    lng: -122.4194155,
  });

  const [center, setcenter] = useState<any>({
    lat: undefined,
    lng: undefined,
  });

  const [zoom, setzoom] = useState(5);

  useEffect(() => {
    setcenter({
      lat: mapInfoData.latitude,
      lng: mapInfoData.longitude,
    });
  }, [mapInfoData]);

  console.log("center", mapInfoData);

  const renderMarkers = (map: any, maps: any) => {
    let marker = new maps.Marker({
      position: { lat: mapInfoData.latitude, lng: mapInfoData.longitude },
      map,
      title: "Hello World!",
    });
    return marker;
  };

  return (
    <div>
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          key={mapInfoData.google_place_id}
          bootstrapURLKeys={{ key: "AIzaSyAzgNkNwqYRzs3g1C8aRfkCZoip_6R3u2Y" }}
          defaultCenter={defaultcenter}
          defaultZoom={zoom}
          center={center}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
        ></GoogleMapReact>
      </div>
    </div>
  );
};

export default MapView;
