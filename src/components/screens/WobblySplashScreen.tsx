import { SplashScreen } from 'expo';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: undefined,
    height: undefined,
  },
});

const WobblySplashScreen: React.FC = () => (
  // useEffect(() => {
  //   SplashScreen.preventAutoHide();
  // }, []);
  <View style={style.wrapper}>
    <Image
      style={style.image}
      source={require('../../../assets/splash.png')}
      onLoadEnd={() => {
        SplashScreen.hide(); // Image is fully presented, instruct SplashScreen to hide
      }}
      fadeDuration={0}
    />
  </View>
);

export default WobblySplashScreen;
