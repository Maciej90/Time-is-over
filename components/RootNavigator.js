import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { StyleSheet, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Timer from './Timer';
import Questions from './Questions';
import QuestionsForm from './QuestionsForm';
import Points from './Points';
import EndOfTurn from './EndOf Turn';

import { useSelector, useDispatch } from 'react-redux';
import { currentQuestionActions } from '../store/index';
import { badAnswersActions }  from '../store/index';

const RootNavigation = () => {
  NavigationBar.setVisibilityAsync("hidden");
  NavigationBar.setBehaviorAsync('overlay-swipe')
  const dispatch = useDispatch();
  const currentQuestion = useSelector((state) => state.currentQuestion.current)
  const wordBaseDataForm = useSelector((state) => state.wordBaseDataForm.wordsData)
  
  const [isEndQuestions, setIsEndQuestions] = useState(false);
  const [isEndRound, setIsEndRound] = useState(false)

  const endQusetionsHandler = (props = false) => {
    if (props) {
      setIsEndQuestions((prev) => !prev)
      setIsEndRound((prev) => !prev)

    } else {
      if(props){
        dispatch(badAnswersActions.add(currentQuestion));
        setIsEndQuestions((prev) => !prev)
        dispatch(currentQuestionActions.reset());
      } else {
        setIsEndQuestions((prev) => !prev)

      }
    }    
  }
  const nextRoundHandler = () => {
    setIsEndRound((prev) => !prev);
  }
    if(wordBaseDataForm.length === 0) {
    return (
      <ImageBackground style={styles.container} source={require('../assets/background.png')}>
        <StatusBar style="auto" hidden={true} />
        <QuestionsForm />
    </ImageBackground>
    )
  }
  if (isEndQuestions) {
    return (
      <ImageBackground style={styles.container} source={require('../assets/background.png')}>
        <StatusBar style="auto" hidden={true} />
        <Header />
        <EndOfTurn endQusetions={endQusetionsHandler} />
      </ImageBackground>
    );
  }
  if (isEndRound) {
    return (
      <ImageBackground style={styles.container} source={require('../assets/background.png')}>
        <StatusBar style="auto" hidden={true} />
        <Header />
        <Points nextRound={nextRoundHandler} />
      </ImageBackground>
    );
  }
  return (
    <ImageBackground style={styles.container} source={require('../assets/background.png')}>
      <StatusBar style="auto" hidden={true} />
      <Header />
      <Timer
        time={50}
        endTime={endQusetionsHandler}
      />
      <Questions endQusetions={endQusetionsHandler} />
    </ImageBackground>
  );

}
export default RootNavigation;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });