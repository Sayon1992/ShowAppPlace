import { call, takeLatest, put } from "redux-saga/effects";
import { ADD_PLACE } from "./placesActionTypes";
import { addPlace } from "./places-actions";
import * as FileSystem from "expo-file-system";
import { insertPlace } from "../helpers/db";

export function* addPlaceWatcher() {
  yield takeLatest("ADD_PLACE_REQUEST", addPlaceFlow);
}

function* addPlaceFlow(action: any) {
  try {
    console.log(action);
    const fileName = action.placeData.selectedImage.split("/").pop();
    const newPath = yield FileSystem.documentDirectory + fileName;
    yield FileSystem.moveAsync({
      from: action.placeData.selectedImage,
      to: newPath,
    });
    const dbResult: unknown = yield insertPlace(
      action.placeData.title,
      newPath,
      "address",
      15.6,
      12.3
    );
    console.log(dbResult);
    const payload = { title: action.placeData.title, image: newPath };
    yield put(addPlace(payload.title, payload.image));
  } catch (e) {
    console.error(e.message);
  }
}
