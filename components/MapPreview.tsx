import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Env from "../env";

interface Props {
  location?: {
    lat?: string;
    long?: string;
  };
  style: any;
  children?: React.ReactNode;
}

const MapPreview: React.FC<Props> = (props) => {
  let imgPreviewUrl: string = "";
  if (props.location) {
    imgPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat}-${props.location.long}&zoom=14&size=600x200&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.long}&key=${Env.googleApiKey}`;
  }
  return (
    <View
      style={{
        ...styles.mapPreview,
        ...props.style,
      }}
    >
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imgPreviewUrl }} />
      ) : (
        props.children
      )}
    </View>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  mapImage: {
    width: "100%",
    height: "100%",
  },
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
});
