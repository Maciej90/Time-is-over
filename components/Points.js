import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import Button from "./Button";
import * as Updates from 'expo-updates';
import { useSelector, useDispatch } from 'react-redux';
import { whatRoundActions } from "../store";
import { whatTeamActions } from "../store";

const Points = (props) => {
    const dispatch = useDispatch();
    const scoreTeam1Round1 = useSelector((state) => state.scoreTeam1.round1);
    const scoreTeam1Round2 = useSelector((state) => state.scoreTeam1.round2);
    const scoreTeam1Round3 = useSelector((state) => state.scoreTeam1.round3);
    const scoreTeam2Round1 = useSelector((state) => state.scoreTeam2.round1);
    const scoreTeam2Round2 = useSelector((state) => state.scoreTeam2.round2);
    const scoreTeam2Round3 = useSelector((state) => state.scoreTeam2.round3);
    const whatRound = useSelector((state) => state.whatRound.round);
    const scoresTeam1 = scoreTeam1Round1 + scoreTeam1Round2 + scoreTeam1Round3;
    const scoresTeam2 = scoreTeam2Round1 + scoreTeam2Round2 + scoreTeam2Round3;
    let whoWhin = '';
    let tittleButton = ''
    if(scoresTeam1 === scoresTeam2) {
        whoWhin = 'Remis'
    } else if(scoresTeam1 > scoresTeam2) {
        whoWhin = 'Wygrała Drużyna 1'
    } else {
        whoWhin = 'Wygrała Drużyna 2'
    }
    if(whatRound === 3){
        tittleButton = 'Restart Gry'
    } else {
        tittleButton = 'Kolejna Runda'
    }
    const onPressHandler = async () => {
        if(whatRound=== 3) {
            await Updates.reloadAsync();
        } else {
            dispatch(whatRoundActions.next());
            dispatch(whatTeamActions.change());
            props.nextRound();
        }

    }
    return (
        <View style={styles.container}>
            {whatRound === 3 ?
                        <Text style={[styles.textStyle, styles.textRound]}>{whoWhin}</Text>:
                        <Text style={[styles.textStyle, styles.textRound]}>Runda {whatRound}</Text>
            }
            <View style={styles.pointsContainer}>
                <View style={styles.points}>
                    <Text style={[styles.textStyle, styles.pointsHeader ]}>Drużyna 1</Text>
                    <View style={styles.pointsItem}>
                        <Text style={[styles.textStyle, {fontSize: 20}]}>Runda 1</Text>
                        <Text style={[styles.textStyle, {fontSize: 20}]}>{scoreTeam1Round1} pkt</Text> 
                    </View>
                    <View style={styles.pointsItem}>
                        <Text style={[styles.textStyle, {fontSize: 20}]}>Runda 2</Text>
                        <Text style={[styles.textStyle, {fontSize: 20}]}>{scoreTeam1Round2} pkt</Text> 
                    </View>
                    <View style={styles.pointsItem}>
                        <Text style={[styles.textStyle, {fontSize: 20}]}>Runda 3</Text>
                        <Text style={[styles.textStyle, {fontSize: 20}]}>{scoreTeam1Round3} pkt</Text> 
                    </View>
                </View>
                <View style={styles.points}>
                    <Text style={[styles.textStyle, styles.pointsHeader ]}>Drużyna 2</Text>
                    <View style={styles.pointsItem}>
                        <Text style={[styles.textStyle, {fontSize: 20}]}>Runda 1</Text>
                        <Text style={[styles.textStyle, {fontSize: 20}]}>{scoreTeam2Round1} pkt</Text> 
                    </View>
                    <View style={styles.pointsItem}>
                        <Text style={[styles.textStyle, {fontSize: 20}]}>Runda 2</Text>
                        <Text style={[styles.textStyle, {fontSize: 20}]}>{scoreTeam2Round2} pkt</Text> 
                    </View>
                    <View style={styles.pointsItem}>
                        <Text style={[styles.textStyle, {fontSize: 20}]}>Runda 3</Text>
                        <Text style={[styles.textStyle, {fontSize: 20}]}>{scoreTeam2Round3} pkt</Text> 
                    </View>
                </View>
            </View>
            <Button title={tittleButton} color='white' onPress={onPressHandler} />
        </View>

    );
}

export default Points;

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        paddingVertical: '5%',
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    textStyle: {
        fontFamily: 'Inter-SemiBoldItalic',
    },
    textRound: {
        textAlign: 'center',
        flex: 6,
        marginTop: '2%',
        fontSize: 90,
        color: 'black',
        textShadowOffset: {width: 2, height: 3 },
        textShadowColor: 'white',
        textShadowRadius: 2,
    },
    pointsContainer: {
        flex: 9,
        width: '97%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: '10%',
    },
    points: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 20,
        marginHorizontal: 5,
        marginTop: 10,
        marginBottom: 30,
        elevation: 3,
    },
    pointsHeader: {
        flex: 1,
        fontSize: 30,
        marginTop: '10%',
    },
    pointsItem: {
        flex: 1,
        flexDirection: 'row',
        width: '95%',
        backgroundColor: '#028688',
        borderRadius: 10,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '9%',
        paddingHorizontal: 5,
        elevation: 3
    },
  });  