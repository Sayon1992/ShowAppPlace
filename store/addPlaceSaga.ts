import { call, takeLatest, put } from "redux-saga/effects";
import * as FileSystem from "expo-file-system";
import { fetchPlaces, insertPlace } from "../helpers/db";
import { AddPlaceI, SET_PLACES_SUCCESS } from "./placesActionTypes";
import { geoApi } from "../API/Api";
import * as Eff from "redux-saga/effects";

export function* addPlaceWatcher() {
  yield takeLatest("ADD_PLACE", addPlaceFlow);
}

export function* fetchPlaceWatcher() {
  yield takeLatest("SET_PLACES", fetchPlaceFlow);
}

function* addPlaceFlow(action: AddPlaceI) {
  try {
    yield console.log(action);

    const response = yield call(
      geoApi,
      action.placeData.location?.lat,
      action.placeData.location?.lng
    );
    if (!response.ok) {
      console.error(response.message);
    }
    if (!response.results) {
      throw new Error("something went wrong");
    }

    const address = response.results[0].formmated_address;

    const fileName: string = <string>(
      action.placeData.selectedImage.split("/").pop()
    );
    const newPath: string = yield FileSystem.documentDirectory + fileName;
    yield FileSystem.moveAsync({
      from: action.placeData.selectedImage,
      to: newPath,
    });

    const dbResult: any = yield call(
      insertPlace,
      action.placeData.title,
      newPath,
      address,
      action.placeData.location?.lat,
      action.placeData.location?.lng
    );

    yield put({
      type: "ADD_PLACE_SUCCESS",
      placeData: {
        id: dbResult.insertId.toString(),
        title: action.placeData.title,
        selectedImage: newPath,
        address: address,
        coords: {
          lat: action.placeData.location?.lat,
          lng: action.placeData.location?.lng,
        },
      },
    });
  } catch (e) {
    console.error("holi" + e.message);
  }
}

function* fetchPlaceFlow() {
  try {
    const dbResult: any = yield call(fetchPlaces);
    yield put({ type: SET_PLACES_SUCCESS, places: dbResult.rows._array });
  } catch (e) {
    console.error(e.message);
  }
}
