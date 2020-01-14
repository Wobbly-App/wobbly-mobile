import React from "react";
import { SafeAreaView, Text } from "react-native";
import LogoutButton from "../molecules/LogoutButton";

export default () => (
  <SafeAreaView>
    <Text>You're logged in!</Text>
    <LogoutButton />
  </SafeAreaView>
);
