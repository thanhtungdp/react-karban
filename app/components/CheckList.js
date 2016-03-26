import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TaskActionCreators from '../actions/TaskActionCreators';

class CheckList extends Component {
    checkInputKeyPress(evt) {
        if (evt.key === 'Enter') {
            let newTask = {id: Date.now(), name: evt.target.value, done: false};
            TaskActionCreators.addTask(this.props.cardId, newTask);
            evt.target.value = '';
        }
    }

    render() {
        let tasks = this.props.tasks.map((task, taskIndex)=>(
            <li className="checklist__task" key={taskIndex}>
                <input type="checkbox" defaultChecked={task.done} onChange={
                    TaskActionCreators.toggleTask.bind(null, this.props.cardId, task, taskIndex)
                }/> {task.name} {' '}
                <a href="#" className="checklist__task--remove" onClick={
                    TaskActionCreators.deleteTask.bind(null, this.props.cardId, task, taskIndex)
                }/>
            </li>
        ));
        return (
            <div className="checkList">
                <ul>
                    {tasks}
                </ul>
                <input type="text"
                       className="checklist--add-task"
                       placeholder="Type then hit Enter to add a task"
                       onKeyPress={this.checkInputKeyPress.bind(this)}
                />
            </div>
        );
    }
}

CheckList.propTypes = {
    cardId: PropTypes.number,
    tasks: PropTypes.arrayOf(PropTypes.object),
}

export default CheckList;