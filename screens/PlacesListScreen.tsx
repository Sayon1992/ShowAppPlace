import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../App";
import Place from "../models/place";
import PlaceItem from "../components/PlaceItem";
import { ListScreenProps } from "../types/rootStack";

const PlacesListScreen: React.FC<ListScreenProps> = ({ navigation }) => {
  const storePlaces = useSelector<RootState, Place[]>(
    (state) => state.places.places
  );
  return (
    <FlatList
      data={storePlaces}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.image}
          onSelect={() => {
            navigation.navigate("PlaceDetail", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
          address={""}
          title={itemData.item.title}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default PlacesListScreen;