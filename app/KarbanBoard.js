import React, {Component, PropTypes} from 'react';
import List from './List';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class KarbanBoard extends Component {
    render() {
        let lists = [
            {name: "todo", title: "To do"},
            {name: "in-progress", title: "In progress"},
            {name: "done", title: "Done"},
        ];
        return (
            <div className="app">
                {
                    lists.map((list, listIndex)=>
                        <List id={list.name} key={listIndex} title={list.title} taskCallbacks={this.props.taskCallbacks}
                              cardCallbacks={this.props.cardCallbacks}
                              cards={this.props.cards.filter((card)=> card.status === list.name)
                           }/>
                    )
                }
            </div>
        )
    }
}

KarbanBoard.propTypes = {
    cardCallbacks: PropTypes.object,
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object
}


export default DragDropContext(HTML5Backend)(KarbanBoard);