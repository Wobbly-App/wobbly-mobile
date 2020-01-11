import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import ClientContext from "../../ClientContext";

import { WobblyClient } from "../../client";

class Landing extends Component {
  static contextType = ClientContext;
  componentDidMount() {
    const { setClient } = this.context;
    setClient(
      new WobblyClient(
        "wss://xmpp.wobbly.app:5443/ws",
        "xmpp.wobbly.app",
        "wobbly-1",
        "dev",
        "Cee9ech4Ia6wupho"
      )
    );
  }

  render() {
    const { state } = this.context;
    const start = state.client && state.client.start;
    return (
      <View style={styles.container}>
        <Text>Welcome to Wobbly!</Text>
        <Button onPress={start} title="Start" />
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
