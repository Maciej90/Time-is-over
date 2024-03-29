import AsyncStorage from '@react-native-async-storage/async-storage';

const savePoints = async () => {
    const getWhatTeam = await AsyncStorage.getItem('WhatTeam');
    const getGoodAnswers = JSON.parse(await AsyncStorage.getItem('GoodAnswers'));
    const getWhatRound =  parseInt( await AsyncStorage.getItem('WhatRound'));
    const setData = async (key, val) => {
        await AsyncStorage.setItem(key, val);
    }

        for (let i = 1; i <= 3; i++) {
        if(getWhatRound === i && getWhatTeam === 'Team1' ){
            const getScore1Round = parseInt(await AsyncStorage.getItem(`${'ScoreRound' + i + 'Team1'}`));
            const getScore1 =  getGoodAnswers.length;
            const updateScore1Round = getScore1Round + getScore1;
            setData(`${'ScoreRound' + i + 'Team1'}`, `${updateScore1Round}`)
            // window.localStorage.setItem(`${'ScoreRound' + i + 'Team1'}`, updateScore1Round);
        }
        else if(getWhatRound === i && getWhatTeam === 'Team2' ){
            const getScore2Round = parseInt(await AsyncStorage.getItem(`${'ScoreRound' + i + 'Team2'}`));
            const getScore2 =  getGoodAnswers.length;
            const updateScore2Round = getScore2Round + getScore2;
            setData(`${'ScoreRound' + i + 'Team1'}`, `${updateScore2Round}`)
            // window.localStorage.setItem(`${'ScoreRound' + i + 'Team2'}`, updateScore2Round);
        }
    }
}
export default savePoints;


// const savePoints = () => {
//     const getWhatTeam = window.localStorage.getItem('WhatTeam');
//     const getGoodAnswers = JSON.parse(window.localStorage.getItem('GoodAnswers'));
//     const getWhatRound = parseInt(window.localStorage.getItem('WhatRound'));
//     for (let i = 1; i <= 3; i++) {
//         if(getWhatRound === i && getWhatTeam === 'Team1' ){
//             const getScore1Round = parseInt(window.localStorage.getItem(`${'ScoreRound' + i + 'Team1'}`));
//             const getScore1 =  getGoodAnswers.length;
//             const updateScore1Round = getScore1Round + getScore1;
//             window.localStorage.setItem(`${'ScoreRound' + i + 'Team1'}`, updateScore1Round);
//         }
//         else if(getWhatRound === i && getWhatTeam === 'Team2' ){
//             const getScore2Round = parseInt(window.localStorage.getItem(`${'ScoreRound' + i + 'Team2'}`));
//             const getScore2 =  getGoodAnswers.length;
//             const updateScore2Round = getScore2Round + getScore2;
//             window.localStorage.setItem(`${'ScoreRound' + i + 'Team2'}`, updateScore2Round);
//         }
//     }

// }
// export default savePoints;