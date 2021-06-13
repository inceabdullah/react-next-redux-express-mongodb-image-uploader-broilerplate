import uploadReducer from './uploadReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    upload: uploadReducer
});

export default rootReducer;
