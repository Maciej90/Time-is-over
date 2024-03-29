import React, {useState} from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Button from "./Button";
import * as Updates from 'expo-updates';
import { useSelector } from 'react-redux';


const Header = () => {
    const [open, setOpen] = useState(false)
    const whatTeam = useSelector((state) => state.whatTeam.team)
    const whatRound = useSelector((state) => state.whatRound.round)

    const openHandler = () => {
        setOpen(prev => !prev);
    }
    const noPressHandler = () => {
        setOpen(prev => !prev);
    };
 const yesPressHandler = async () => {
    await Updates.reloadAsync();
    };
    if (!open) {
            return (<View style={styles.container}>
        <View style={styles.round}>
            <Text style={styles.roundText }>{whatRound !==3 ? `Runda ${whatRound}`: ''}</Text>
        </View>
        <View style={styles.team}>
            <Text style={styles.roundText }>{whatRound !==3 ? `Runda ${whatRound}`: ''}</Text>
        </View>
        <TouchableOpacity style={styles.iconContainer} onPress={openHandler}>
            <Image style={styles.cogIcon} source={require('../assets/cogIcon.png')}/>
        </TouchableOpacity>
    </View>
    );
    } else {
        return (
            <View style={styles.open}>
                <View style={[styles.container, { borderBottomColor: 'white' }]}>
                    <View style={styles.round}>
                        <Text style={styles.roundText }>{whatRound !==3 ? `Runda ${whatRound}`: ''}</Text>
                    </View>
                    <View style={styles.team}>
                    <Text style={styles.roundText }>{whatRound !==3 ? `Runda ${whatRound}`: ''}</Text>
                    </View>
                    <TouchableOpacity style={styles.iconContainer} onPress={openHandler}>
                        <Image style={styles.cogIcon} source={require('../assets/cogIcon.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.openContainer}>
                    <Text style={styles.textStyle}>Koniec gry?</Text>
                    <View style={styles.btnContainer}>
                        <View style={styles.btn}>
                            <Button title='Tak' color='gold' onPress={yesPressHandler} />
                        </View>
                        <View style={styles.btn}>
                        <Button title='Nie' color='gold' onPress={noPressHandler} />
                        </View>            
                    </View>
                </View>
            </View>

        );
    }

};
export default Header;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        zIndex:100,
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        borderStyle: 'solid',
    },
    round: {
        flex: 3,
        height: '100%',
        justifyContent: 'center',
    },
    roundText: {
        paddingLeft: 12,
        fontFamily: 'Inter-SemiBoldItalic',
        fontSize: 20,
    },
    team: {
        flex: 5,
        height: '100%',
        justifyContent: 'center',
    },
    teamText: {
        fontFamily: 'Inter-SemiBoldItalic',
        fontSize: 20,
        paddingLeft: '15%',
    },
    iconContainer: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5, 
    },
    cogIcon: {
        resizeMode: 'contain',
        width: '60%',
    },
    open: {
        position:'absolute',
        top: 0,
        width: '100%',
        backgroundColor: 'white',
        zIndex:100,
    },
    openContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: 200,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        borderStyle: 'solid',
    },
    textStyle: {
        marginTop: '10%',
        marginBottom: '2%',
        flex: 1,
        fontFamily: 'Inter-SemiBoldItalic',
        fontSize: 30,
    },
    btnContainer: {
        flexDirection: 'row',
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '7%'
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    openIconContainer: {
        width: '11.1%',
        marginHorizontal: 5, 
        height: 40,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
    },
    openCogIcon: {
        resizeMode: 'contain',
        height: "80%"
    },

  });