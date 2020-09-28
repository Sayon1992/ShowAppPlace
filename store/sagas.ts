import { fork } from "redux-saga/effects";
import { addPlaceWatcher } from "./addPlaceSaga";

export function* sagas() {
  yield fork(addPlaceWatcher);
}
