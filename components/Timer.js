import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';

const Timer = (props) => {
    const [s, setTime] = useState(props.time);
    const [paused, setPaused] = useState(false)
    const [cutTime, setIsCutTime] = useState(false);
    const endTimer = () => {
      props.endTime(false);
    };
    const tick = () => {
      if (paused) {
        return;
      } 
      if (s !== 0){ 
        setTime(s-1);
       }; 
      if (s <= 0) {
        setTimeout(()=> {   
          setPaused(true);
          setTime(props.time);
          endTimer();
        },100)
 
      };
    };  
    useEffect(() => {
      if(paused){
        setPaused(false)
      }
      switch (cutTime) {
        case true:
          setTime(s-5);
          setIsCutTime((prevState)=>!prevState);   
          break;
      }
      const timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    }); 
  if (s <= 0) {
    return <ImageBackground source={require('../assets/background.png')} style={styles.containerLogo}>
          <Image source={require('../assets/logo.png')} style={styles.imageLogo} />
      </ImageBackground>
  } else {
    return (
      <View style={styles.container}>
          <Text style={styles.text}>{s}</Text>
      </View>
  );
  }
  };
export default Timer;

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    containerLogo: {
      position:'absolute',
        zIndex: 1000,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    text: {
      textAlign: 'center',
      width: '100%',
      fontFamily: 'Inter-SemiBoldItalic',
      fontSize: 175,
      color: '#028688',
      textShadowOffset: {width: 4, height: 6 },
      textShadowColor: 'white',
      textShadowRadius: 2,

    },
    imageLogo: {
      flex: 1,
      resizeMode: 'contain',
      width: '95%',

    },
  });