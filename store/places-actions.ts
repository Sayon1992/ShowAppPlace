import {
  ADD_PLACE,
  AddPlaceI,
  SET_PLACES,
  FetchPlaceI,
} from "./placesActionTypes";

export const addPlace = (
  id: string,
  title: string,
  selectedImage: string
): AddPlaceI => {
  const returnAction: AddPlaceI = {
    type: ADD_PLACE,
    placeData: { id: id, title: title, selectedImage: selectedImage },
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
