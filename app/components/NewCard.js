import React, {Component, PropTypes} from 'react';
import CardForm from './CardForm';
import CardStore from '../stores/CardStore';
import CardActionCreators from '../actions/CardActionCreators';
import {Container} from 'flux/utils';
import DraftStore from '../stores/DraftStore';

class NewCard extends Component {
    componentDidMount() {
        setTimeout(()=> {
            CardActionCreators.createDraft(CardStore.getCard(this.props.params.card_id))
        }, 0)
    }

    handleChange(field, value) {
        CardActionCreators.updateDraft(field, value)
    }

    handleSubmit(e) {
        e.preventDefault();
        CardActionCreators.addCard(this.state.draft);
        this.props.history.pushState(null, '/');
    }

    handleClose(e) {
        this.props.history.pushState(null, '/');
    }

    render() {
        return (
            <CardForm draftCard={this.state.draft}
                      buttonLabel="Create Card"
                      handleChange={this.handleChange.bind(this)}
                      handleSubmit={this.handleSubmit.bind(this)}
                      handleClose={this.handleClose.bind(this)}
            />
        )
    }
}

NewCard.propTypes = {}
NewCard.getStores = () => ([DraftStore]);
NewCard.calculateState = (prevState) => ({
    draft: DraftStore.getState()
});

export default Container.create(NewCard);