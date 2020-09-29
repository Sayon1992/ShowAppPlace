import { fork } from "redux-saga/effects";
import { addPlaceWatcher, fetchPlaceWatcher } from "./addPlaceSaga";

export function* sagas() {
  yield fork(addPlaceWatcher);
  yield fork(fetchPlaceWatcher);
}
