import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View } from "react-native";

import {registerUser} from "../../actions/session";

class Landing extends Component {
  componentDidMount() {
      this.props.registerUser("gabby_test@example.com");
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
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

export default connect(null, {registerUser})(Landing)