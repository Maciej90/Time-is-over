import AsyncStorage from '@react-native-async-storage/async-storage';

const setTeam = async (props = true) => {
    const getWhatTeam = await AsyncStorage.getItem('WhatTeam');
    const getWhatRound =  parseInt( await AsyncStorage.getItem('WhatRound'));
    const setData = async (key, val) => {
        await AsyncStorage.setItem(key, val);
    }

    if(props){
        if(getWhatTeam === 'Team1') {
            setData('WhatTeam', 'Team2');
        //   await AsyncStorage.setItem('WhatTeam', 'Team2')
        } if(getWhatTeam === 'Team2') {
            setData('WhatTeam', 'Team1');
            // await AsyncStorage.setItem('WhatTeam', 'Team1')
        } 
    } else {
            for (let i = 1; i <= 3; i++) {
            if(getWhatRound === i){
                const getScore1 = parseInt(await AsyncStorage.getItem(`${'ScoreRound' + (i-1) + 'Team1'}`));
                const getScore2 = parseInt(await AsyncStorage.getItem(`${'ScoreRound' + (i-1) + 'Team2'}`));
                if(getScore1 > getScore2) {
                    setData('WhatTeam', 'Team2');
                    // window.localStorage.setItem('WhatTeam', 'Team2')
                } else {
                    setData('WhatTeam', 'Team1');
                    // window.localStorage.setItem('WhatTeam', 'Team1')
                }
            }
        }
        }

} 
export default setTeam;