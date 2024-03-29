import { StyleSheet,  TouchableOpacity, Text, FlatList, View } from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react';
import Button from './Button.js';
import Header from './Header.js';

import { useSelector, useDispatch } from 'react-redux';
import { goodAnswersActions }  from '../store/index';
import { badAnswersActions }  from '../store/index';
import { otherGoodAnswersActions } from '../store/index';
import { wordBaseDataActions } from '../store/index';
import { whatTeamActions } from '../store/index';
import { scoreTeam1Actions } from '../store/index';
import { scoreTeam2Actions } from '../store/index';
import { currentQuestionActions } from '../store/index';

const EndOfTurn = (props) => {
    const [refresh, setRefresh] = useState();
    const dispatch = useDispatch();
    const currentQuestion = useSelector((state) => state.currentQuestion.current)
    const whatTeam = useSelector((state) => state.whatTeam.team)
    const whatRound = useSelector((state) => state.whatRound.round)
    const goodAnswers =  useSelector((state) => state.goodAnswers.good)
    const badAnswers = useSelector((state) => state.badAnswers.bad)
    const badAnswersMap = badAnswers.map((item) => {return [{qtex: item.qtex, key: item.qtex}]})
    const goodAnswersMap = goodAnswers.map((item) => {return [{qtex: item.qtex, key: item.qtex}]})
    const questions =  useSelector((state) => state.wordBaseData.words)
    const WORDSBASE =   useSelector((state) => state.wordBaseDataForm.wordsData)
    const otherGoodAnswers = useSelector((state) => state.otherGoodAnswers.otherGood)
    let tittleButton = '';
    const badAnswersAndQuestions = questions.concat(badAnswersMap)
    let propsq = ['qtex', 'key'];
    let result = []
    useEffect(()=>{
    //   result = badAnswersAndQuestions.filter(function(o1){
    //     // filter out (!) items in result2
    //     return !goodAnswersMap.some(function(o2){
    //         return o1.qtex === o2.qtex;          // assumes unique id
    //     });
    // }).map(function(o){
    //     // use reduce to make objects with only the required properties
    //     // and map to apply this to the filtered array as a whole
    //     return propsq.reduce(function(newo, name){
    //         newo[name] = o[name];
    //         return newo;
    //     }, {});
    // });
    },[refresh])

    const onPressHandler = (text, key, id) => {
      if(id === 'good') {
        const newgood = goodAnswers.filter(q => q.key != key);
        dispatch(goodAnswersActions.update(newgood))
        dispatch(badAnswersActions.add(text))
      } else {
        const newbad = badAnswers.filter(q => q.key != key);
        dispatch(badAnswersActions.update(newbad))
        dispatch(goodAnswersActions.add(text))
      }
      setRefresh({})
    }
    const savePoints = () => {
      const points = parseInt(goodAnswers.length)
      if(whatTeam === 'Drużyna 1'){
        if(whatRound === 1){
          dispatch(scoreTeam1Actions.addRound1(points))
        }
        if(whatRound === 2)
        {
          dispatch(scoreTeam1Actions.addRound2(points))
        }
        if(whatRound === 3) {
          dispatch(scoreTeam1Actions.addRound3(points))
        }
      }
      if(whatTeam === 'Drużyna 2'){
        if(whatRound === 1){
          dispatch(scoreTeam2Actions.addRound1(points))
        }
        if(whatRound === 2)
        {
          dispatch(scoreTeam2Actions.addRound2(points))
        }
        if(whatRound === 3) {
          dispatch(scoreTeam2Actions.addRound3(points))
        }
      }
    }
    const endQuestionsHandler = (data) => {
      dispatch(goodAnswersActions.resetGood())
      dispatch(badAnswersActions.resetBad())
      if(data){
       props.endQusetions(true)        
      } else {
       props.endQusetions(false)
      }
    }
    const saveButton = () => {
      if((otherGoodAnswers + goodAnswers.length) === WORDSBASE.length) {
        savePoints();
        endQuestionsHandler(true)
        dispatch(otherGoodAnswersActions.reset())
      } else {
        savePoints();
        dispatch(wordBaseDataActions.add(result))
        endQuestionsHandler(false)
        dispatch(whatTeamActions.change())  
      }
    }

  console.log('dobre '+goodAnswers.length);
  console.log('zle '+badAnswers.length);
  console.log('pozostale '+otherGoodAnswers);
  console.log('baza '+WORDSBASE.length);
  console.log('current '+ questions)
  console.log('update '+result)

  const goodAndBad = [].concat( goodAnswers, badAnswers );
    if((otherGoodAnswers + goodAnswers.length) === WORDSBASE.length) {
      tittleButton = 'Następna Runda'
    } else {
      tittleButton = 'Zmiana drużyny'
    }
        return (
        <View style={styles.container}>
          <Header></Header>
            <View style={styles.list}>
                <FlatList 
                    data={goodAndBad}
                    renderItem={({item}) =>(
                        <TouchableOpacity
                          activeOpacity={0.07}
                          onPress={()=> onPressHandler(item.qtex, item.key, item.id)}>
                          {item.id === 'good' && <Text style={[styles.listItem, styles.listItemGood]}  >{item.qtex}</Text> }
                          {item.id === 'bad' && <Text style={[styles.listItem, styles.listItemBad]}  >{item.qtex}</Text> }
                        </TouchableOpacity>         
                    )}
                />
            </View>
            <Button title={tittleButton} color='white' onPress={saveButton} />  
        </View>
            );
}
export default EndOfTurn;
const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    list: {
      flex: 1,
      paddingVertical: '25%',
      width: '75%',
    },
    listItem: {
      fontFamily: 'Inter-SemiBoldItalic',
      fontSize: 20,
      textAlign: 'center',
      marginVertical: 6,
      backgroundColor: 'white',
      borderRadius: 15,
      borderColor: 'green',
      borderWidth: 2,
      borderStyle: 'solid',
      paddingHorizontal: 10,
      paddingVertical: 5,
      elevation: 3,
      width: '100%',
    },
    listItemGood: { 
      borderColor: 'green',    
    },
    listItemBad: {
      borderColor: 'red',
    }
  });