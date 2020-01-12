import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import ClientContext from "../../app/ClientContext";
import WobblyClient from "../../common/WobblyClient";
import { saveCredentials } from "../../redux/modules/auth";
import { connect, ConnectedProps } from "react-redux";

const connector = connect(undefined, { saveCredentials });
type PropsFromRedux = ConnectedProps<typeof connector>;

const Landing: React.FC<PropsFromRedux> = ({ saveCredentials }) => {
  const { state, setClient } = useContext(ClientContext);
  useEffect(() => {
    console.log("Saving creds and client...");
    saveCredentials("dev@xmpp.wobbly.app", "Cee9ech4Ia6wupho");
    setClient(
      new WobblyClient(
        "wss://xmpp.wobbly.app:5443/ws",
        "xmpp.wobbly.app",
        "wobbly-1",
        "dev",
        "Cee9ech4Ia6wupho"
      )
    );
  }, []);
  const start = state.client && state.client.start;
  return (
    <View style={styles.container}>
      <Text>Welcome to Wobbly!</Text>
      <Button onPress={start as any} title="Start" />
    </View>
  );
};
export default connector(Landing);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
