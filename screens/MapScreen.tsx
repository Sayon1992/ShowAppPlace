import { getCurrentPositionAsync } from "expo-location";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, {
  AnimatedRegion,
  LatLng,
  MapEvent,
  Marker,
} from "react-native-maps";

interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface MarkerI {
  lat?: any;
  lng?: any;
}

const MapScreen: React.FC = () => {
  let location: any;
  const getLocation = async () => {
    location = await getCurrentPositionAsync;
  };

  useEffect(() => {
    getLocation();
  }, []);
  const [selectedLocation, setSelectedLocation] = useState<MarkerI>();
  const mapRegion: MapRegion = {
    latitude: 37,
    longitude: -122,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (e: MapEvent): void => {
    setSelectedLocation({
      lat: e.nativeEvent.coordinate.latitude,
      lng: e.nativeEvent.coordinate.longitude,
    });
  };

  let markerCoordinates = {
    latitude: 0,
    longitude: 0,
  };

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  return (
    <MapView
      style={styles.map}
      onPress={selectLocationHandler}
      region={mapRegion}
    >
      <Marker title="Picked Location" coordinate={markerCoordinates}></Marker>
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapScreen;
