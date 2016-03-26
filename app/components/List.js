import React, {Component, PropTypes} from 'react';
import Card from './Card';
import {DropTarget} from 'react-dnd';
import constants from '../constants';
import CardActionCreators from '../actions/CardActionCreators'

const listTargetSpec = {
    hover(props, monitor){
        const draggedId = monitor.getItem().id;
        CardActionCreators.updateCardStatus(draggedId, props.id);
    }
}

const collect = (connect, minitor)=> {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

class List extends Component {
    render() {
        const {connectDropTarget} = this.props;
        var cards = this.props.cards.map((card)=>
            <Card key={card.id} {...card}  />
        )
        return connectDropTarget(
            <div className="list">
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        )
    }
}

List.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object),
    connectDropTarget: PropTypes.func.isRequired
}

export default DropTarget(constants.CARD, listTargetSpec, collect)(List);