import { StyleSheet, View, Image, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';

const Start = (props) => {
  const onPressHandler = () => {
    props.onPress();
  };
  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.container} >
      <StatusBar hidden={true}></StatusBar>
      <View style={styles.logo}>
        <Image source={require('../assets/logo.png')} style={styles.imageLogo} />
      </View>
      <View style={styles.start}>
        <TouchableOpacity style={styles.startTouchableOpacity} onPress={onPressHandler}>
          <Image source={require('../assets/start.png')} style={styles.imageStart} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
export default Start;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 4,
    width: '100%',
  },
  imageLogo: { 
    resizeMode: 'contain',
    width: '95%',
  },
  start: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
    width: '100%',
    marginBottom: '60%',
  },
  startTouchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  imageStart: { 
    resizeMode: 'contain',
    width: '90%',
  }
});