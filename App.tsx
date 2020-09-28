import React from "react";
import { StyleSheet } from "react-native";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import { NavigationContainer } from "@react-navigation/native";
import PlacesNavigator from "./navigation/PlacesNavigation";
import placesReducer from "./store/places-reducers";
import { sagas } from "./store/sagas";
import { init } from "./helpers/db";

init()
  .then(() => {
    console.log("initialized database");
  })
  .catch((err) => {
    console.log("initializing db failed");
    console.log(err);
  });

const rootReducer = combineReducers({
  places: placesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PlacesNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
