import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ClientContext } from "../../client";

import { WobblyClient } from "../../client";

class Landing extends Component {
  static contextType = ClientContext;
  componentDidMount() {
    const client: WobblyClient = this.context;
    client
      .connect("test@localhost", "mypass")
      .then(() => {
        console.warn("connected!");
      })
      .catch(() => {
        console.warn("failed to connect!");
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to Wobbly!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Landing;
