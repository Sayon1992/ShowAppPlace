import {
  ADD_PLACE,
  ADD_PLACE_SUCCESS,
  Places,
  SET_PLACES_SUCCESS,
} from "./placesActionTypes";
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
    case ADD_PLACE_SUCCESS:
      const newPlace = new Place(
        action.placeData.id,
        action.placeData.title,
        action.placeData.selectedImage
      );
      return {
        places: state.places.concat(newPlace),
      };
    case SET_PLACES_SUCCESS:
      return {
        places: action.places.map(
          (place: Places) =>
            new Place(place.id.toString(), place.title, place.image)
        ),
      };
    default:
      return state;
  }
};
