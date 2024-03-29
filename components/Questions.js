import React, {useState, useEffect} from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { wordBaseDataActions }  from '../store/index';
import { goodAnswersActions }  from '../store/index';
import { badAnswersActions }  from '../store/index';
import { currentQuestionActions } from '../store/index';
import { othersQuestionsActions } from '../store/index';

const Questions = (event) => {

    const dispatch = useDispatch();
    const WORDSBASE = useSelector((state) => state.wordBaseDataForm.wordsData)
    const qeustions = useSelector((state) => state.wordBaseData.words)
    const [refresh, setRefresh] = useState();
    const [randomElement, setRandomElement] = useState();
    const endQuestionsHandler = () => {
      event.endQusetions();
    };
    const saveAnswers = (props, data) => {
        if(props) {
            dispatch(goodAnswersActions.add(data))
            dispatch(othersQuestionsActions.add(data))
         } else {
            dispatch(badAnswersActions.add(data))
         }
    };
  
    useEffect(()=>{
        if(qeustions.length === 0) {
            dispatch(wordBaseDataActions.add(WORDSBASE))
            setRefresh({})
        }
        setRandomElement(qeustions[Math.floor(Math.random() * qeustions.length)].qtex);
    },[refresh]);
    dispatch(currentQuestionActions.update(randomElement));
    const newQuestion = (props, data) => {
      saveAnswers(props, data);
      const newQuestions = qeustions.filter((val)=>{ return val.qtex !== randomElement});
      if(newQuestions.length === 0){
          dispatch(currentQuestionActions.reset());
        dispatch(wordBaseDataActions.update(newQuestions));
        endQuestionsHandler();
      } else {
        dispatch(wordBaseDataActions.update(newQuestions));
      }
      setRefresh({});
    };

    return (
        <View style={styles.container}>
            <View style={styles.questionContainer}>
                <Image source={require('../assets/cloudQuestions.png')} style={styles.questionImage}/>
                <View style={styles.questionTextContainer}>
                    <Text style={styles.questionText}>{randomElement}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.yes} activeOpacity={0.07} onPress={() => newQuestion(true, randomElement)}>
                <Image source={require('../assets/yes.png')} style={styles.yesImage}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.no} activeOpacity={0.07} onPress={() => newQuestion(false, randomElement)}>
                <Image source={require('../assets/no.png')} style={styles.noImage}/>
            </TouchableOpacity>
        </View>
    );
}
export default Questions;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: '2%',
      flexDirection: 'column',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    questionContainer: {
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        height: 150,
    },
    questionImage: {
        height: '100%',
        resizeMode: 'contain',
        width: '95%',
    },
    questionText: {
        paddingVertical: 10,  
        textAlign: 'center',
        fontFamily: 'Inter-SemiBoldItalic',
        fontSize: 35,
    },
    questionTextContainer: {
        position: 'absolute',
        height: 133,
        width: '77%',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },  
    textStyle: {
        textAlign: 'center',
        fontFamily: 'Inter-SemiBoldItalic',
        fontSize: 35,
    },
    yes: {
        marginTop: '1%',
        marginBottom: '6%',
        width: '94%',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    yesImage: {
        flex: 1,
        width: '100%',
        resizeMode: 'contain',
    },
    no: {
        marginBottom: '5%',
        width: '94%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noImage: {
        flex: 1,
        width: '100%',
        resizeMode: 'contain',
    },
  });