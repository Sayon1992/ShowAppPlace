import React, { useState } from "react";
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

const NewPlaceScreen: React.FC = (props: any) => {
  const [title, setTitle] = useState<string>("");
  const [selectedImage, setselectedImage] = useState<any>();

  const dispatch = useDispatch();

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace("", title, selectedImage));
    props.navigation.goBack();
  };

  const imageTakenHandler = (imagePath: any) => {
    setselectedImage(imagePath);
  };

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
        <LocationPicker />
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
