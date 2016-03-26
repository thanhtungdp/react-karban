import React, {Component, PropTypes} from 'react';
import Card from './Card';
import {DropTarget} from 'react-dnd';
import constants from '../constants';

const listTargetSpec = {
    hover(props, monitor){
        const draggedId = monitor.getItem().id;
        props.cardCallbacks.updateStatus(draggedId, props.id);
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
            <Card id={card.id}
                  key={card.id}
                  title={card.title}
                  color={card.color}
                  description={card.description}
                  tasks={card.tasks}
                  taskCallbacks={this.props.taskCallbacks}
                  cardCallbacks={this.props.cardCallbacks}
            />
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
    taskCallbacks: PropTypes.object,
    cardCallbacks: PropTypes.object,
}

export default DropTarget(constants.CARD,listTargetSpec, collect)(List);