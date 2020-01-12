import { StyleSheet, View, Image } from "react-native";
import React, { useEffect } from "react";
import { SplashScreen } from "expo";

export default () => {
  useEffect(() => {
    SplashScreen.preventAutoHide();
  }, []);
  return (
    <View style={style.wrapper}>
      <Image
        style={style.image}
        source={require("../../../assets/splash.png")}
        onLoadEnd={() => {
          SplashScreen.hide(); // Image is fully presented, instruct SplashScreen to hide
        }}
        fadeDuration={0}
      />
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: undefined,
    height: undefined
  }
});
