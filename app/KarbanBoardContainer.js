import React, {Component, PropTypes} from 'react';
import KarbanBoard from './KarbanBoard';
import 'whatwg-fetch';
import 'babel-polyfill';
import update from 'react-addons-update';
import {throttle} from './utils';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-type': 'application/json',
    Authorization: 'tungptkh@gmail.com'
}

class KarbanBoardContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            cards: []
        }

        //Only call updateCardStatus when argyments change
        this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
        this.updateCardPosition = throttle(this.updateCardPosition.bind(this), 500);

    }

    addTask(cardId, taskName) {
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
        let newTask = {id: Date.now(), name: taskName, done: false}
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$push: [newTask]}
            }
        });
        this.setState({cards: nextState});

        fetch(`${API_URL}/cards/${cardId}/tasks`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newTask)
        })
            .then((response)=> {
                if (response.ok) {
                    return response.json()
                }
                else throw new Error("Server response wasn't OK")
            })
            .then((responseData)=> {
                // Update id
                newTask.id = responseData.id;
                this.setState({cards: nextState});
            })
            .catch((error)=> {
                console.log(error);
                this.setState(prevState);
            });
    }

    deleteTask(cardId, taskId, taskIndex) {
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$splice: [[taskIndex, 1]]}
            }
        })
        this.setState({cards: nextState});
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'delete',
            headers: API_HEADERS
        })
            .then((response)=> {
                if (!response.ok) {
                    throw new Error("Server response wasn't OK");
                }
            })
            .catch((error)=> {
                console.log(error);
                this.setState(prevState);
            });

    }

    toggleTask(cardId, taskId, taskIndex) {
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card)=>card.id === cardId);
        let newDoneValue;
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: {
                            $apply: (value)=> {
                                newDoneValue = !value;
                                return newDoneValue;
                            }
                        }
                    }
                }
            }
        });
        this.setState({cards: nextState});
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({done: newDoneValue})
        })
            .then((response)=> {
                if (response.ok) {
                    return response.json()
                }
                else throw new Error("Server response wasn't OK")
            })
            .catch((error)=> {
                this.setState(prevState);
            });
    }

    updateCardStatus(cardId, listId) {
        let cardIndex = this.state.cards.findIndex((card)=>card.id === cardId);
        let card = this.state.cards[cardIndex];
        if (card.status != listId) {
            this.setState(update(this.state, {
                cards: {
                    [cardIndex]: {
                        status: {$set: listId}
                    }
                }
            }))
        }
    }

    updateCardPosition(cardId, afterId) {
        if (cardId !== afterId) {
            let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
            let card = this.state.cards[cardIndex];
            let afterIndex = this.state.cards.findIndex((card)=>card.id == afterId);
            this.setState(update(this.state, {
                cards: {
                    $splice: [
                        [cardIndex, 1],
                        [afterIndex, 0, card]
                    ]
                }
            }))
        }
    }

    persistCardDrag(cardId, status) {
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
        let card = this.state.cards[cardIndex];
        fetch(`${API_URL}/cards/${cardId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({status: card.status, raw_order_position: cardIndex})
        })
            .then((response)=> {
                if (!response.ok) {
                    throw new Error("Server response wasn't OK");
                }
            })
            .catch((error)=> {
                console.error('Fetch error: ', error);
                //Rollba
                this.setState(
                    update(this.state, {
                        cards: {
                            [cardIndex]: {
                                status: {$set: status}
                            }
                        }
                    })
                )
            })
    }

    componentDidMount() {
        fetch(API_URL + '/cards', {headers: API_HEADERS})
            .then((response)=>response.json())
            .then((responseData)=> {
                this.setState({cards: responseData});
            })
            .catch((error)=> {
                console.log('Error fetching and paring data', error);
            })
    }
    render() {
        return (
            <KarbanBoard cards={this.state.cards}
                         taskCallbacks={{
                            toggle: this.toggleTask.bind(this),
                            add: this.addTask.bind(this),
                            delete: this.deleteTask.bind(this)
                         }}
                         cardCallbacks={{
                            updateStatus: this.updateCardStatus.bind(this),
                            updatePosition: this.updateCardPosition.bind(this),
                            persistCardDrag: this.persistCardDrag.bind(this)
                         }}
            />
        )
    }
}

export default KarbanBoardContainer;