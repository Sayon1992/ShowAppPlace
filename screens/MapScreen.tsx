import { getCurrentPositionAsync } from "expo-location";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, {
  AnimatedRegion,
  LatLng,
  MapEvent,
  Marker,
} from "react-native-maps";
import { MapScreenProps } from "../types/rootStack";

interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface MarkerI {
  lat?: any;
  lng?: any;
}

const MapScreen: React.FC<MapScreenProps> = (props) => {
  const [selectedLocation, setSelectedLocation] = useState<MarkerI>();

  const mapRegion: MapRegion = {
    latitude: 37,
    longitude: -122,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (e: MapEvent): void => {
    const lati = e.nativeEvent.coordinate.latitude;
    const longi = e.nativeEvent.coordinate.longitude;

    setSelectedLocation({
      lat: lati,
      lng: longi,
    });
    // setSelectedLocation((state) => {
    //   console.log(state);
    //   return state;
    // });
  };

  const savePickedLocationHandler = useCallback((): void => {
    if (!selectedLocation) {
      return;
    }
    props.navigation.navigate("NewPlace", { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  return (
    <MapView
      style={styles.map}
      onPress={(e) => {
        selectLocationHandler(e);
      }}
      region={mapRegion}
    >
      <Marker
        title="Picked Location"
        coordinate={
          markerCoordinates ? markerCoordinates : { latitude: 0, longitude: 0 }
        }
      ></Marker>
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapScreen;
