import React, {Component, PropTypes} from 'react';
import KarbanBoard from './KarbanBoard';
import 'whatwg-fetch';
import 'babel-polyfill';
import update from 'react-addons-update';
import {throttle} from '../utils';

import {Container} from 'flux/utils'
import CardStore from '../stores/CardStore';
import CardActionCreators from '../actions/CardActionCreators';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-type': 'application/json',
    Authorization: 'tungptkh@gmail.com'
}

class KarbanBoardContainer extends Component {
    componentDidMount() {
        CardActionCreators.fetchCards();
    }

    render() {
        let karban_board = this.props.children && React.cloneElement(this.props.children, {
                cards: this.state.cards
            });
        return (karban_board);
    }
}
KarbanBoardContainer.getStores = ()=>([CardStore]);
KarbanBoardContainer.calculateState = (prevState)=>({
    cards: CardStore.getState()
});

export default Container.create(KarbanBoardContainer);