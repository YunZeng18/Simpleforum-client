import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { fetchForums } from '../store/reducers/forumReducer';
import PropTypes from 'prop-types'

class ForumList extends Component {

    componentWillMount() {
        this.props.fetchForums();
    }
    render() {

        return (
            <main className="forum-list">
                <h1>Forums</h1>
                <ul>
                    {this.props.forumList.map(item =>
                        <Link to={`/forum/name=${item.name}`} key={item.id}>
                            <li className="forum-list__item" >
                                <h3>{item.name}</h3>
                                <p className="forum-list__item__description">{item.description}</p>
                            </li>
                        </Link>
                    )}
                </ul>
            </main>
        );
    }
}

ForumList.propTypes = {
    fetchForums: PropTypes.func.isRequired,
    forumList: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
    return {

        forumList: state.forums.list,
    };
};
export default connect(mapStateToProps, { fetchForums })(ForumList);