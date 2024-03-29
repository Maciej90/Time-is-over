import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import React, { useState } from 'react';
import {Provider} from 'react-redux';
import store from './store/index';
import Start from './components/Start';
import RootNavigation from './components/RootNavigator';

export default function App() {
  NavigationBar.setVisibilityAsync("hidden");
  NavigationBar.setBehaviorAsync('overlay-swipe')
  SplashScreen.preventAutoHideAsync();
    const [isStarted, setIsStarted] = useState(false);
    const startGameHandler = () => {
      setIsStarted(true);
    }
    let [fontsLoaded] = useFonts({
    'Inter-SemiBoldItalic': require('./assets/fonts/GoodDog.otf'),
  });
  if (!fontsLoaded) {
    return null;
  } else if (!isStarted) {
    SplashScreen.hideAsync()
    return <Start onPress={startGameHandler} />
  }
  return (
    <Provider store={store} >
      <RootNavigation />
    </Provider>
  );
}