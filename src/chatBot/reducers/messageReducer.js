import { Map } from 'immutable';

export default (state = Map({
    'data': {
        messageList: []
    }
}), action) => {
    switch (action.type) {
        case 'SEND_MESSAGE':
            //return state.set('data', { messageList: state.get('data').messageList.concat(message) });
            return state.set('data', { messageList: action.payload });
        default:
            return state;
    }
};