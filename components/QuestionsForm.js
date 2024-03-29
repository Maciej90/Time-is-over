import { StyleSheet, TextInput, TouchableOpacity, Text, FlatList, View } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useState, useEffect } from 'react';
import React from 'react';
import Button from './Button.js';

import { useDispatch } from 'react-redux';
import { wordBaseDataFormActions } from '../store/index';
import { wordBaseDataActions }  from '../store/index';
import { whatRoundActions } from '../store/index';

const QuestionsForm = () => {
  NavigationBar.setVisibilityAsync("hidden");
  NavigationBar.setBehaviorAsync('overlay-swipe')
  const dispatch = useDispatch();
    const [item, setItem] = useState();
    const [qeustions, setQuestions] = useState();
    // const makeid = () => {
    //   let text = "";
    //   const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";          
    //   for (let i = 0; i < 5; i++)
    //     text += possible.charAt(Math.floor(Math.random() * possible.length));          
    //   return text;
    // } 
    const addHandler = (val) => {
        if(item != undefined) {
          if(qeustions === undefined) {
            setQuestions([{qtex: val, key: val}])
          } else {
            setQuestions(prev => {
              return [
                ...prev, {qtex: val, key: val}
              ]
            });
          }
          setItem();
        }
      }
      const removeHandler = (key) => {
        setQuestions(prev => {
          return prev.filter(q => q.key != key);
        })
      }
      const saveHandler = () => {
        const q = qeustions.map((item) => {
          return [item.qtex];
        });
        dispatch(wordBaseDataFormActions.save(qeustions));
        dispatch(wordBaseDataActions.add(qeustions));
        dispatch(whatRoundActions.next());
      };
    return (
        <View style={styles.container}>
            <TextInput
                value={item}
                style={styles.form}
                multiline={true}
                onChangeText={(val) => setItem(val)}
            />
            <Button title='Dodaj' color='white' onPress={() => addHandler(item)} />
            <View style={styles.list}>
                <FlatList 
                    data={qeustions}
                    renderItem={({item}) =>(
                        <TouchableOpacity activeOpacity={0.07} onPress={()=> removeHandler(item.key)}>
                            <Text style={styles.listItem}  >{item.qtex}</Text>
                        </TouchableOpacity>         
                    )}
                />
            </View>
            <Button title='Zapisz' color='white' onPress={saveHandler} />  
        </View>
            );
};
const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    form: {
      fontFamily: 'Inter-SemiBoldItalic',
      fontSize: 20,
      marginTop: '15%',
      width: '75%',
      backgroundColor: 'white',
      borderRadius: 15,
      borderColor: 'black',
      borderWidth: 1,
      borderStyle: 'solid',
      paddingHorizontal: 10,
      paddingVertical: 5,
      elevation: 3,  
    },
    list: {
      flex: 1,
      paddingVertical: 5,
      width: '75%',
    },
    listItem: {
      fontFamily: 'Inter-SemiBoldItalic',
      fontSize: 20,
      textAlign: 'center',
      marginVertical: 6,
      backgroundColor: 'white',
      borderRadius: 15,
      borderColor: 'black',
      borderWidth: 1,
      borderStyle: 'solid',
      paddingHorizontal: 10,
      paddingVertical: 5,
      elevation: 3,
      width: '100%',
    }
  });


export default QuestionsForm;