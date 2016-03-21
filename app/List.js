import React, {Component, PropTypes} from 'react';
import Card from './Card';

class List extends Component {
    render() {
        var cards = this.props.cards.map((card)=>
                <Card id={card.id}
                      key={card.id}
                      title={card.title}
                      color={card.color}
                      description={card.description}
                      tasks={card.tasks}
                      taskCallbacks={this.props.taskCallbacks}
                />
        )
        return (
            <div className="list">
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        )
    }
}

List.propTypes = {
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object
}

export default List;