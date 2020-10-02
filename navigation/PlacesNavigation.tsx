import React from "react";
import { Platform, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

import { createStackNavigator } from "@react-navigation/stack";

import MapScreen from "../screens/MapScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import PlacesListScreen from "../screens/PlacesListScreen";
import {
  RootStackParamList,
  DetailScreenProps,
  MapScreenProps,
} from "../types/rootStack";

const Stack = createStackNavigator<RootStackParamList>();

const PlacesNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Places"
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : "",
        },
        headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
      }}
    >
      <Stack.Screen
        options={({ navigation, route }) => ({
          headerTitle: "Places",
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons
                name={Platform.OS === "android" ? "md-add" : "ios-add"}
                size={23}
                color={Platform.OS === "android" ? "white" : Colors.primary}
                style={{ marginRight: 10 }}
                onPress={() => {
                  navigation.navigate("NewPlace");
                }}
              />
            </TouchableOpacity>
          ),
        })}
        name="Places"
        component={PlacesListScreen}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={({ navigation, route }: MapScreenProps) => ({
          headerRight: () => {
            const readOnly = route.params?.readOnly;
            if (readOnly) {
              return <></>;
            } else {
              return (
                <TouchableOpacity
                  style={styles.headerButton}
                  onPress={route.params?.saveLocation}
                >
                  <Text style={styles.headerButtonText}>Save</Text>
                </TouchableOpacity>
              );
            }
          },
        })}
      />
      <Stack.Screen
        name="NewPlace"
        component={NewPlaceScreen}
        options={{ headerTitle: "Add Place" }}
      />
      <Stack.Screen
        name="PlaceDetail"
        component={PlaceDetailScreen}
        options={({ navigation, route }: DetailScreenProps) => ({
          headerTitle: route.params?.placeTitle ?? "",
        })}
      />
    </Stack.Navigator>
  );
};

export default PlacesNavigation;

const styles = StyleSheet.create({
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
});
