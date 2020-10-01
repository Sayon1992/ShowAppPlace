import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import Env from "../env";

interface Props {
  location?: {
    lat?: string;
    lng?: string;
  };
  style?: any;
  children?: React.ReactNode;
  onPress?: () => void;
}

const MapPreview: React.FC<Props> = (props) => {
  let imgPreviewUrl: string = "";
  if (props.location) {
    imgPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat}-${props.location.lng}&zoom=14&size=600x200&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${Env.googleApiKey}`;
  }
  return (
    <TouchableOpacity
      style={{
        ...styles.mapPreview,
        ...props.style,
      }}
      onPress={props.onPress}
    >
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imgPreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
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
