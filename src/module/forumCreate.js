import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { createForum } from '../store/reducers/forumReducer';
import PropTypes from 'prop-types'

class ForumCreate extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event) {
        event.preventDefault();
        const newForum = {
            name: event.target.name.value,
            description: event.target.description.value
        }

        if (!newForum.name || !newForum.description) {
            alert("Please fill in a title and a description for the forum.");
        } else {

            this.props.createForum(newForum);

            this.props.history.push('/forum/list')
        }
    }

    render() {

        return (
            <main className="forum-create">
                <h1>Create your own forum and foster a community!</h1>
                <form className="forum-create__form" onSubmit={this.handleSubmit}>

                    <div className="forum-create__text-input">
                        <label className='label' htmlFor="name">Name</label>
                        <input className='forum-create__text' type="text" id="name" placeholder="Name your forum" autoComplete="off" />
                        <label className='label' htmlFor="description">Describe the topic this forum will discuss.</label>
                        <textarea className='forum-create__textarea' id="description" type='texarea' placeholder="e.g. what did you eat yesterday?" />
                    </div>

                    <div className="forum-create__links">
                        <Link className="forum-create__cancel" to="/">Cancel</Link>
                        <button className="btn forum-create__btn" value="Submit">Create</button>

                    </div>
                </form>
            </main>
        );
    }
}

ForumCreate.propTypes = {
    createForum: PropTypes.func.isRequired
}

export default connect(null, { createForum })(ForumCreate);