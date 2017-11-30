import { Map } from 'immutable';

export default (state = Map({
    'data': { messageList: [] }
}), action) => {
    switch (action.type) {
        case 'GETLIST':
            return state.set('data', { palyerList: action.payload, loading: false });
        case 'ADDPLAYER':
            return state.set('data', { palyerList: action.payload });
        default:
            return state;
    }
};