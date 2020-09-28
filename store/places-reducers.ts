import { ADD_PLACE } from "./placesActionTypes";
import { dispatchTypes } from "./placesActionTypes";
import Place from "../models/Place";

export interface defaultInitialState {
  places: Array<Place>;
}

const initialState: defaultInitialState = {
  places: [],
};

export default (
  state: defaultInitialState = initialState,
  action: dispatchTypes
): defaultInitialState => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        new Date().toString(),
        action.placeData.title,
        action.placeData.selectedImage
      );
      return {
        places: state.places.concat(newPlace),
      };
    default:
      return state;
  }
};
