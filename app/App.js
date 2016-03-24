import React,{Component} from 'react';
import {render} from 'react-dom';
import 'react-addons-update'
import {Router, Route, hashHistory} from 'react-router';
import KarbanBoardContainer from './KarbanBoardContainer';
import KarbanBoard from './KarbanBoard';
import NewCard from './NewCard';
import EditCard from './EditCard';

class Routes extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route component={KarbanBoardContainer}>
                    <Route path="/" component={KarbanBoard}>
                        <Route path="new" component={NewCard}/>
                        <Route path="edit/:card_id" component={EditCard}/>
                    </Route>
                </Route>
            </Router>
        )
    }
}

render(<Routes />, document.getElementById('root'))