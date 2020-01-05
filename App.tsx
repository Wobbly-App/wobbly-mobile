import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";

import { store } from "./src/store/configureStore";
import Landing from "./src/components/screens/Landing";

export default function App() {
  return (
    <Provider store={store}>
      <Landing />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
