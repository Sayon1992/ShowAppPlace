import React, { useState } from "react";
import { StyleSheet, Button, Text, View, Image, Alert } from "react-native";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

interface camera {
  cancelled: boolean;
  height: number;
  type: string;
  uri: string;
  width: number;
}

interface Props {
  onImageTaken: (a: string) => void;
}

const ImgPicker: React.FC<Props> = (props) => {
  const [pickedImage, setPickedImage] = useState<string>();

  const verifyPermissions = async (): Promise<boolean> => {
    await Permissions.askAsync(Permissions.CAMERA);
    const resultRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (resultRoll.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camara and gallery permissions to use this app.",
        [{ text: "OK" }]
      );
      return false;
    }

    return true;
  };

  const takeImageHandler = async (): Promise<void> => {
    const permission: boolean = await verifyPermissions();
    if (permission) {
      const image: any = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });
      setPickedImage(image.uri);
      props.onImageTaken(image.uri);
    }
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image source={{ uri: pickedImage }} style={styles.image} />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImgPicker;
