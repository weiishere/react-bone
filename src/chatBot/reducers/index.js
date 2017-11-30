import {combineReducers} from 'redux-immutable';
import messageList from './messageReducer';

export default combineReducers({
    messageList
});