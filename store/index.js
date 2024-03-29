import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialGoodAnswers = {good: []}
const initialBadAnswers =  {bad: []};
const initialOtherGoodAnswers =  {otherGood: 0};
const initialWordBaseData =  {words: []};
const initialWordBaseDataForm =  {wordsData: []};
const initialCurrentQuestion = {current: undefined};
const initialOthersQuestions = {other: []};
const initialWhatRound = {round: 0}
const initialWhatTeam = {team: 'Drużyna 1'};
const initialScoreTeam1 = {round1: 0, round2: 0, round3: 0}
const initialScoreTeam2 = {round1: 0, round2: 0, round3: 0}
const initialEndTime = {endTime: false}


const goodAnswersSlice = createSlice({
    name: 'goodAnswers',
    initialState: initialGoodAnswers,
    reducers: {
        add(state, action) {
            state.good = [...state.good, {qtex: action.payload, key: action.payload, id: 'good'}]
        },
        update(state, action) {
            state.good = action.payload
        },
        resetGood(state) {
            state.good =  [];
        }
    }
});
const othersQuestionsSlice = createSlice({
    name: 'otherQuestions',
    initialState: initialOthersQuestions,
    reducers: {
        add(state, action) {
            state.other = [...state.other, action.payload]
        },
        remove(state, action) {
            state.other = state.other.filter((item) => {return [item !== action.payload]})
        },
        reset(state) {
            state.other =  [];
        }
    }
})

const endTimeSlice =createSlice({
    name: 'endTime',
    initialState: initialEndTime,
    reducers:{
        end(state) {
            state.endTime = true
        },
        start(state) {
            state.endTime = false
        }
    }
});
const badAnswersSlice = createSlice({
    name: 'badAnswers',
    initialState: initialBadAnswers,
    reducers: {
        add(state, action) {
            state.bad = [...state.bad, {qtex: action.payload, key: action.payload, id: 'bad'}]
        },
        update(state, action) {
            state.bad = action.payload
        },
        resetBad(state) {
            state.bad =  [];
        }
    }
});
const otherGoodAnswersSlice = createSlice({
    name: 'otherGoodAnswers',
    initialState: initialOtherGoodAnswers,
    reducers: {
        add(state, action) {
            state.otherGood = state.otherGood + action.payload
        },
        reset(state) {
            state.otherGood = 0;
        }
    }
});
const wordBaseDataFormSlice = createSlice({
    name: 'wordBaseDataForm',
    initialState: initialWordBaseDataForm,
    reducers: {
        save(state, action) {
            state.wordsData = action.payload;
        },
        reset(state) {
            state.wordsData = [];
        }
    }
});
const wordBaseDataSlice = createSlice({
    name: 'wordBaseData',
    initialState: initialWordBaseData,
    reducers: {
        add(state, action) {
            state.words = action.payload
        },
        update(state, action) {
            state.words = action.payload
        },
        reset(state) {
            state.words = [];
        }
    }
});
const currentQuestionSlice = createSlice({
    name: 'currentQuestion',
    initialState: initialCurrentQuestion,
    reducers: {
        update(state, action) {
            state.current = action.payload
        },
        reset(state) {
            state.current = undefined
        }
    }
});
const whatRoundSlice = createSlice({
    name: 'whatRound',
    initialState: initialWhatRound,
    reducers: {
        next(state) {
            state.round = state.round + 1
        },
        reset(state) {
            state.round = 0
        }
    }
});
const whatTeamSlice = createSlice({
    name: 'whatTeam',
    initialState: initialWhatTeam,
    reducers: {
        change(state) {
            if(state.team === 'Drużyna 1') {
                state.team =  state.team ='Drużyna 2'
                return
            }
            if(state.team === 'Drużyna 2') {
                state.team = state.team = 'Drużyna 1'
                return
            }
        },
        reset(state) {
            state.team = 'Drużyna 1'
        }
    }
});
const scoreTeam1SLice = createSlice({
    name: 'scoreTeam1',
    initialState: initialScoreTeam1,
    reducers: {
        addRound1(state, action) {
            state.round1 = state.round1 + action.payload
        },
        addRound2(state, action) {
            state.round2 = state.round2 + action.payload
        },
        addRound3(state, action) {
            state.round3 = state.round3 + action.payload
        },
       reset(state){
           state.round1 = 0,
           state.round2 = 0,
           state.round3 = 0
       } 
    }
});
const scoreTeam2SLice = createSlice({
    name: 'scoreTeam2',
    initialState: initialScoreTeam2,
    reducers: {
        addRound1(state, action) {
            state.round1 = state.round1 + action.payload
        },
        addRound2(state, action) {
            state.round2 = state.round2 + action.payload
        },
        addRound3(state, action) {
            state.round3 = state.round3 + action.payload
        },
        reset(state){
            state.round1 = 0,
            state.round2 = 0,
            state.round3 = 0
        }
    }
});


const store  = configureStore({
    reducer: {
        goodAnswers: goodAnswersSlice.reducer,
        badAnswers: badAnswersSlice.reducer,
        otherGoodAnswers: otherGoodAnswersSlice.reducer,
        wordBaseData: wordBaseDataSlice.reducer,
        wordBaseDataForm: wordBaseDataFormSlice.reducer,
        currentQuestion: currentQuestionSlice.reducer,
        whatRound: whatRoundSlice.reducer,
        whatTeam: whatTeamSlice.reducer,
        scoreTeam1: scoreTeam1SLice.reducer,
        scoreTeam2: scoreTeam2SLice.reducer,
        endTime: endTimeSlice.reducer,
        othersQuestions: othersQuestionsSlice.reducer
    }
});

export const goodAnswersActions = goodAnswersSlice.actions;
export const badAnswersActions = badAnswersSlice.actions;
export const otherGoodAnswersActions = otherGoodAnswersSlice.actions;
export const wordBaseDataActions = wordBaseDataSlice.actions;
export const wordBaseDataFormActions = wordBaseDataFormSlice.actions;
export const currentQuestionActions = currentQuestionSlice.actions;
export const whatRoundActions = whatRoundSlice.actions;
export const whatTeamActions = whatTeamSlice.actions;
export const scoreTeam1Actions = scoreTeam1SLice.actions;
export const scoreTeam2Actions = scoreTeam2SLice.actions;
export const endTimeActions = endTimeSlice.actions;
export const othersQuestionsActions = othersQuestionsSlice.actions;

export default store;