import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import store from './store/store';
import { Provider } from 'react-redux';


import axios from 'axios';
import Comment from './module/comment';
import Header from './module/header/header';
import logo from './asset/Icon/dragon-ball-icon.png';
import SideNav from './module/SideNav';
import Home from './module/Home';
import ForumList from './module/forumList';
import ForumCreate from './module/forumCreate';
import ForumName from './module/forumName';
import WorkInProgress from './module/WorkInProgress';

//webserver
export const API_URL = 'https://notmyfinalforum-server.herokuapp.com';

export default class App extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {

    }
    componentDidUpdate(prevProp, prevState, snapshot) {




    }


    render() {

        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Header logoSrc={logo} />
                    <SideNav />
                    <Switch>
                        <Route path="/" component={Home} exact />
                        <Route path="/forum/list" component={ForumList} />
                        <Route path="/forum/create" render={(props) => <ForumCreate {...props} />} />
                        <Route path="/forum/:name" render={(props) => <ForumName {...props} />} />
                        <Route path="/work-in-progress" component={WorkInProgress} />
                    </Switch>

                </BrowserRouter>
            </Provider>
        );
    }
}