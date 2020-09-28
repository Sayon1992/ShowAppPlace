export const ADD_PLACE = "ADD_PLACE";

export interface AddPlaceI {
  type: typeof ADD_PLACE;
  placeData: {
    title: string;
    selectedImage: any;
  };
}

export type dispatchTypes = AddPlaceI;
