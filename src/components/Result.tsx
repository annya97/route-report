import { useCallback, useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

type ResultProps = {
  vehicleId: string,
  dateFrom: string,
  dateTo: string
};

const containerStyle = {
  width: '100%',
  height: '400px'
}

const center = {
  lat: 55.89284,
  lng: 27.17383
}

export function Result({vehicleId, dateFrom, dateTo}: ResultProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAORsb9b49Evy6v6lMA9-n3Az-i94qffWg',
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    const url = 'https://mapon.com/api/v1/route/list.json';
    const apiKey = '93737a19206c2d71d26360187d64ac0fc6656621';

    fetch(`${url}?key=${apiKey}&from=${dateFrom}&till=${dateTo}&unit_id=${vehicleId}&include=polyline`)
      .then(response => response.json())
      .then(data => console.log('x', data));
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>
        <Marker position={center} />
      </>
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  )
}
