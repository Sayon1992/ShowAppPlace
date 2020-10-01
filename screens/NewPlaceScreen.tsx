import React, { useCallback, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
} from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import * as placesActions from "../store/places-actions";
import ImgPicker from "../components/ImgPicker";
import LocationPicker from "../components/LocationPicker";
import { NewScreenProps } from "../types/rootStack";

export interface Location {
  lat?: string;
  lng?: string;
}

const NewPlaceScreen: React.FC<NewScreenProps> = (props) => {
  const [title, setTitle] = useState<string>("");
  const [selectedImage, setselectedImage] = useState<any>();
  const [selectedLocation, setSelectedLocation] = useState<Location>();

  const dispatch = useDispatch();

  const savePlaceHandler = () => {
    console.log(title);
    console.log(selectedImage);
    console.log(selectedLocation);
    dispatch(
      placesActions.addPlace("", title, selectedImage, selectedLocation)
    );
    props.navigation.goBack();
  };

  const imageTakenHandler = (imagePath: any) => {
    setselectedImage(imagePath);
  };

  const locationPickedHandler = useCallback(
    (location: { lat: string; lng: string }): void => {
      setSelectedLocation(location);
    },
    []
  );

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          onChangeText={(e) => {
            setTitle(e);
          }}
          value={title}
          style={styles.textInput}
        />
        <ImgPicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          onLocationPicked={locationPickedHandler}
          route={props.route}
          navigation={props.navigation}
        />
        <Button
          title="Save Place"
          onPress={savePlaceHandler}
          color={Colors.primary}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
