import { ADD_PLACE, AddPlaceI } from "./placesActionTypes";

export const addPlace = (title: string, selectedImage: any): any => {
  let returnAction: AddPlaceI;
  returnAction = {
    type: ADD_PLACE,
    placeData: { title: title, selectedImage: selectedImage },
  };
  return returnAction;
};
