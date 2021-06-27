import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../App';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { fetchForums } from '../store/reducers/forumReducer';

class ForumList extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.props.fetchForums();


    }
    render() {
        console.log(this.props);
        return (
            <main className="forum-list">
                <h1>Forums</h1>
                <ul>
                    {this.props.forumList &&
                        this.props.forumList.map(item =>
                            <li className="forum-list__item">
                                <button className="forum-list__btn">Join</button>
                                <Link to={`/forum/${item.name}`}>
                                    <h3>{item.name}</h3>
                                    <p className="forum-list__item__description">{item.description}</p>
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </main>
        );
    }
}
const mapStateToProps = (state) => {
    return {

        forumList: state.forums.items,
    };
};
export default connect(mapStateToProps, { fetchForums })(ForumList);