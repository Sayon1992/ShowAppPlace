import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Map: undefined;
  Places: undefined;
  PlaceDetail:
    | {
        placeTitle: string;
        placeId: string;
      }
    | undefined;
  NewPlace: undefined;
};

type PlacesDetailScreenRouteProp = RouteProp<RootStackParamList, "PlaceDetail">;
type PlacesListScreenRouteProp = RouteProp<RootStackParamList, "Places">;
type PlacesMapScreenRouteProp = RouteProp<RootStackParamList, "Map">;
type NewPlaceScreenRouteProp = RouteProp<RootStackParamList, "NewPlace">;

type PlacesDetailNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PlaceDetail"
>;

type PlacesListNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Places"
>;

type PlacesMapNavigationProp = StackNavigationProp<RootStackParamList, "Map">;

type NewPlaceNavigationProp = StackNavigationProp<
  RootStackParamList,
  "NewPlace"
>;

export interface ListScreenProps {
  navigation: PlacesListNavigationProp;
  route: PlacesListScreenRouteProp;
}

export interface MapScreenProps {
  navigation: PlacesMapNavigationProp;
  route: PlacesMapScreenRouteProp;
}

export interface DetailScreenProps {
  navigation: PlacesDetailNavigationProp;
  route: PlacesDetailScreenRouteProp;
}

export interface NewScreenProps {
  navigation: NewPlaceNavigationProp;
  route: NewPlaceScreenRouteProp;
}
