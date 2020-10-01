import { Location } from "../screens/NewPlaceScreen";

export const ADD_PLACE = "ADD_PLACE";
export const ADD_PLACE_SUCCESS = "ADD_PLACE_SUCCESS";
export const ADD_PLACE_FAILED = "ADD_PLACE_FAILED";

export const SET_PLACES = "SET_PLACES";
export const SET_PLACES_SUCCESS = "SET_PLACES_SUCCESS";
export const SET_PLACES_FAILED = "SET_PLACES_FAILED";

export interface Places {
  id: { toString: () => string };
  title: string;
  image: any;
  address: string;
  lat: string;
  lng: string;
}

export interface AddPlaceI {
  type: typeof ADD_PLACE;
  placeData: {
    id: string;
    title: string;
    selectedImage: string;
    location: Location | undefined;
  };
}

export interface AddPlaceSI {
  type: typeof ADD_PLACE_SUCCESS;
  placeData: {
    id: string;
    title: string;
    selectedImage: string;
    address: string;
    coords: {
      lat: string;
      lng: string;
    };
  };
}

export interface FetchPlaceI {
  type: typeof SET_PLACES;
  places: any;
}

export interface FetchPlaceSI {
  type: typeof SET_PLACES_SUCCESS;
  places: Array<Places>;
}

export type dispatchTypes = AddPlaceSI | FetchPlaceSI;
