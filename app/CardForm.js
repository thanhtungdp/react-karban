import React, {Component, PropTypes} from 'react';

class CardForm extends Component {
    handleChange(field, e) {
        this.props.handleChange(field, e.target.value);
    }

    handleClose(e) {
        e.preventDefault();
        this.props.handleClose();
    }

    render() {
        var draftCard = this.props.draftCard;
        return (
            <div>
                <div className="card big">
                    <form onSubmit={this.props.handleSubmit.bind(this)}>
                        <input
                            type="text"
                            value={draftCard.title}
                            onChange={this.handleChange.bind(this,'title')}
                            placeholder="Title"
                            required={true}
                            autoFocus={true}/>
                        <br/>
                        <textarea
                            value={draftCard.description}
                            onChange={this.handleChange.bind(this,'description')}
                            placeholder="Descipriton"
                            required={true}/>
                        <br/>
                        <label htmlFor="status">Status</label>
                        <select id="status"
                                value={draftCard.status}
                                onChange={this.handleChange.bind(this,'status')}>
                            <option value="todo">To do</option>
                            <option value="in-progress">In progress</option>
                            <option value="done">Done</option>
                        </select>
                        <br />
                        <label htmlFor="color">Color</label>
                        <input id="color"
                               value={draftCard.color}
                               onChange={this.handleChange.bind(this,'color')}
                               type="color"
                               defaultValue="#ff0000"/>
                        <div className='actions'>
                            <button type="submit">{this.props.buttonLabel}</button>
                        </div>
                    </form>
                </div>
                <div className="overlay" onClick={this.handleClose.bind(this)}></div>
            </div>
        )
    }
}

CardForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    draftCard: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        status: PropTypes.string,
        color: PropTypes.color
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
}

export default CardForm;