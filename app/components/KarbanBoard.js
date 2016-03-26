import React, {Component, PropTypes} from 'react';
import List from './List';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {Link} from 'react-router';

class KarbanBoard extends Component {
    render() {
        let lists = [
            {name: "todo", title: "To do"},
            {name: "in-progress", title: "In progress"},
            {name: "done", title: "Done"},
        ];
        let cardModal = this.props.children && React.cloneElement(this.props.children, {
                cards: this.props.cards
            });
        return (
            <div className="app">
                <Link to="/new" className="float-button">+</Link>
                {
                    lists.map((list, listIndex)=>
                        <List id={list.name} key={listIndex} title={list.title}
                              cards={this.props.cards.filter((card)=> card.status === list.name)
                           }/>
                    )
                }
                {cardModal}
            </div>
        )
    }
}

KarbanBoard.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object)
}


export default DragDropContext(HTML5Backend)(KarbanBoard);