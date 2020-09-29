import { call, takeLatest, put } from "redux-saga/effects";
import * as FileSystem from "expo-file-system";
import { fetchPlaces, insertPlace } from "../helpers/db";
import { AddPlaceI, SET_PLACES_SUCCESS } from "./placesActionTypes";

export function* addPlaceWatcher() {
  yield takeLatest("ADD_PLACE", addPlaceFlow);
}

export function* fetchPlaceWatcher() {
  yield takeLatest("SET_PLACES", fetchPlaceFlow);
}

function* addPlaceFlow(action: AddPlaceI) {
  try {
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
      "address",
      15.6,
      12.3
    );

    yield put({
      type: "ADD_PLACE_SUCCESS",
      placeData: {
        id: dbResult.insertId.toString(),
        title: action.placeData.title,
        selectedImage: newPath,
      },
    });
  } catch (e) {
    console.error(e.message);
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
