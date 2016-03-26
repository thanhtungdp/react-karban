import AppDispatcher from '../AppDispatcher';
import {ReduceStore} from 'flux/utils';
import constants from '../constants';
import update from 'react-addons-update';
import 'babel-polyfill'

class CardStore extends ReduceStore {
    getInitialState() {
        return [];
    }

    getCard(cardId) {
        return this._state.find((card)=>card.id == cardId);
    }

    getCardIndex(cardId) {
        return this._state.findIndex((card)=>card.id == cardId);
    }

    reduce(state, action) {
        switch (action.type) {
            case constants.FETCH_CARDS_SUCCESS:
                return action.payload.response;
            case constants.CREATE_CARD:
                return update(this.getState(), {$push: [action.payload.card]});
            case constants.CREATE_CARD_SUCCESS:
                var cardIndex = this.getCardIndex(action.payload.card.id);
                return update(this.getState(), {
                    [cardIndex]: {
                        id: {$set: action.payload.response.id}
                    }
                });
            case constants.CREATE_CARD_ERROR:
                var cardIndex = this.getCardIndex(action.payload.card.id);
                return update(this.getState(), {$splice: [[cardIndex, 1]]});

            /*
             *   Card update
             */
            case constants.UPDATE_CARD:
                var cardIndex = this.getCardIndex(action.payload.card.id);
                return update(this.getState(), {[cardIndex]: {$set: action.payload.draftCard}});
            case constants.UPDATE_CARD_ERROR:
                var cardIndex = this.getCardIndex(action.payload.card.id);
                return update(this.getState(), {
                    [cardIndex]: {
                        $set: action.payload.card
                    }
                });

            case constants.TOGGLE_CARD_DETAILS:
                var cardIndex = this.getCardIndex(action.payload.cardId);
                console.log('toggle from store ' + cardIndex);

                return update(this.getState(), {
                    [cardIndex]: {
                        showDetails: {$apply: (currentValue)=> (currentValue == true) ? false : true}
                    }
                })

            /*
             * Card drop, drag
             */
            case constants.UPDATE_CARD_POSITION:
                if (action.payload.cardId !== action.payload.afterId) {
                    var cardIndex = this.getCardIndex(action.payload.cardId);
                    let card = this.getState()[cardIndex];
                    let afterIndex = this.getCardIndex(action.payload.afterId);
                    return update(this.state, {
                        $splice: [
                            [cardIndex, 1],
                            [afterIndex, 0, card]
                        ]
                    });
                }
                break;
            case constants.UPDATE_CARD_STATUS:
                var cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex]: {
                        status: {$set: action.payload.listId}
                    }
                })
            case constants.PERSIST_CARD_DRAG_ERROR:
                var cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex]: {
                        status: {$set: action.payload.cardProps.status}
                    }
                });

            /*
             *  Task creation
             */
            case constants.CREATE_TASK:
                var cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: {$push: [action.payload.task]}
                    }
                });
            case constants.CREATE_TASK_SUCCESS:
                var cardIndex = this.getCardIndex(action.payload.cardId);
                var taskIndex = this.getState()[cardIndex].tasks.findIndex((task) => task.id == action.payload.task.id)
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: {
                            [taskIndex]: {
                                id: {$set: action.payload.response.id}
                            }
                        }
                    }
                })
            case constants.CREATE_TASK_ERROR:
                var cardIndex = this.getCardIndex(action.payload.cardId);
                var taskIndex = this.getState()[cardIndex].tasks.findIndex((task) => task.id == action.payload.task.id)
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: {$slice: [[taskIndex, 1]]}
                    }
                })
                break;

            case constants.DELETE_TASK:
                var cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: {
                            $splice: [[action.payload.taskIndex, 1]]
                        }
                    }
                });
            case constants.DELETE_TASK_ERROR:
                var cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: {
                            $splice: [action.payload.taskIndex, 0, action.payload.task]
                        }
                    }
                });

            /*
             * Task toggling
             */
            case constants.TOGGLE_TASK:
                var cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: {
                            [action.payload.taskIndex]: {done: {$apply: (done) => !done}}
                        }
                    }
                });
            default:
                return state;
        }
    }
}

export default new CardStore(AppDispatcher)