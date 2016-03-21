import React, {Component, PropTypes} from 'react';
import CheckList from './CheckList';
import marked from 'marked';

class Card extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            showDetails: false
        }
    }

    toggleDetails() {
        this.setState({showDetails: !this.state.showDetails});
    }

    render() {
        let cardDetails;
        if (this.state.showDetails) {
            cardDetails = (
                <div className="card__details">
                    <span dangerouslySetInnerHTML={{__html:marked(this.props.description)}}></span>
                    <CheckList cardId={this.props.id} tasks={this.props.tasks}/>
                </div>
            );
        }

        let sideColor = {
            position: 'absolute',
            zIndex: -1,
            top:0,
            bottom: 0,
            left: 0,
            width: 8,
            backgroundColor: this.props.color
        }
        return (
            <div className="card">
                <div style={sideColor} />
                <div className="card__title" onClick={this.toggleDetails.bind(this)}>
                    <i className={this.state.showDetails?'fa fa-caret-down':'fa fa-caret-right'}></i>{" "}
                    {this.props.title}
                </div>
                {cardDetails}
            </div>
        );
    }
}

let titlePropType = (props, propName, componentName) => {
    if(props[propName]){
        let value = props[propName];
        if(typeof  value !== 'string' || value.length > 80){
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
    tasks: PropTypes.arrayOf(PropTypes.object)
}

export default Card;