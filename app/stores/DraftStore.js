import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import update from 'react-addons-update';

let defaultCard = ()=>({
    id: Date.now(),
    title: '',
    description: '',
    status: 'todo',
    color: '#c9c9c9',
    tasks: []
});

class DraftStore extends ReduceStore {
    getInitialState() {
        return defaultCard();
    }

    reduce(state, action) {
        switch (action.type) {
            case constants.CREATE_DRAFT:
                if (action.payload.card) {
                    return action.payload.card;
                }
                else return defaultCard();
            case constants.UPDATE_DRAFT:
                return update(state, {
                    [action.payload.field]: {$set: action.payload.value}
                });
            default:
                return state;
        }
    }
}

export default new DraftStore(AppDispatcher);