import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  Button,
} from "react-native";
import Colors from "../constants/Colors";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapPreview from "./MapPreview";

interface LocationPicked {
  lat: string;
  long: string;
}

const LocationPicker: React.FC = () => {
  const [pickedLocation, setPickedLocation] = useState<LocationPicked>();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const verifyPermissions = async (): Promise<boolean> => {
    const result = await Permissions.askAsync(Permissions.LOCATION);

    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camara and gallery permissions to use this app.",
        [{ text: "OK" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission: boolean = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    try {
      setIsFetching(true);
      const location: any = await Location.getCurrentPositionAsync({});
      console.log(location);

      setPickedLocation({
        lat: location.coords.latitude,
        long: location.coords.longitude,
      });
    } catch (e) {
      Alert.alert("Could not fetch location", "Please try again later", [
        { text: "OK" },
      ]);
    }
    setIsFetching(false);
  };
  return (
    <View style={styles.locationPicker}>
      <MapPreview location={pickedLocation} style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet.</Text>
        )}
      </MapPreview>
      <Button
        onPress={getLocationHandler}
        title={"Get User Location"}
        color={Colors.primary}
      />
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    height: 150,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
