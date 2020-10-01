import {
  ADD_PLACE,
  AddPlaceI,
  SET_PLACES,
  FetchPlaceI,
} from "./placesActionTypes";
import { Location } from "../screens/NewPlaceScreen";

export const addPlace = (
  id: string,
  title: string,
  selectedImage: string,
  location: Location | undefined
): AddPlaceI => {
  const returnAction: AddPlaceI = {
    type: ADD_PLACE,
    placeData: {
      id: id,
      title: title,
      selectedImage: selectedImage,
      location: location,
    },
  };
  return returnAction;
};

export const fetchPlace = (places: string[]) => {
  const returnAction: FetchPlaceI = {
    type: SET_PLACES,
    places: places,
  };
  return returnAction;
};
