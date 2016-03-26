import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import marked from 'marked';
import CheckList from './CheckList';
import {DragSource, DropTarget} from 'react-dnd';
import constants from '../constants';
import CardActionCreators from '../actions/CardActionCreators';

const cardDragSpec = {
    beginDrag(props){
        return {
            id: props.id,
            status: props.status
        }
    },
    endDrag(props){
        CardActionCreators.persistCardDrag(props);
    }
}

const cardDropSpec = {
    hover(props, monitor){
        const draggedId = monitor.getItem().id;
        if (props.id !== draggedId) {
            CardActionCreators.updateCard(draggedId, props.id);
        }
    }
}

const collectDrag = (connect, minitor)=> {
    return {
        connectDragSource: connect.dragSource()
    }
}

const collectDrop = (connect, minitor)=> {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

class Card extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            showDetails: false
        }
    }

    toggleDetails() {
        CardActionCreators.toggleCardDetails(this.props.id);
    }

    render() {
        const {connectDragSource, connectDropTarget} = this.props;
        let cardDetails;
        if (this.props.showDetails) {
            cardDetails = (
                <div className="card__details">
                    <span dangerouslySetInnerHTML={{__html:marked(this.props.description)}}></span>
                    <CheckList cardId={this.props.id} tasks={this.props.tasks} />
                </div>
            );
        }

        let sideColor = {
            position: 'absolute',
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 8,
            backgroundColor: this.props.color
        }
        return connectDropTarget(connectDragSource(
            <div className="card">
                <div style={sideColor}/>
                <div className="card__edit"><Link to={'/edit/'+this.props.id}>&#9998;</Link></div>
                <div className="card__title" onClick={this.toggleDetails.bind(this)}>
                    <i className={this.props.showDetails?'fa fa-caret-down':'fa fa-caret-right'}></i>{" "}
                    {this.props.title}
                </div>
                <ReactCSSTransitionGroup
                    transitionName="toggle"
                    transitionEnterTimeout={250}
                    transitionLeaveTimeout={250}
                >
                    {cardDetails}
                </ReactCSSTransitionGroup>
            </div>
        ));
    }
}

let titlePropType = (props, propName, componentName) => {
    if (props[propName]) {
        let value = props[propName];
        if (typeof  value !== 'string' || value.length > 80) {
            return new Error(
                `${propName} in ${componentName} is longer than 80 characters`
            )
        }
    }
}

Card.propTypes = {
    id: PropTypes.number,
    title: titlePropType,
    description: PropTypes.string,
    color: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.object),
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
}

const dragHighOrderCard = DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
const dragDropHighOrderCard = DropTarget(constants.CARD, cardDropSpec, collectDrop)(dragHighOrderCard)

export default dragDropHighOrderCard;