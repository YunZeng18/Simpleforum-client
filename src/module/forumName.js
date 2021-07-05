import axios from 'axios';
import React, { Component } from 'react';
import { API_URL } from '../App';
import timeDisplay from './helper/timeFormat';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { fetchForumByName } from '../store/reducers/forumReducer';

class ForumName extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

        this.handlePostRender = this.handlePostRender.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.handleCommentRender = this.handleCommentRender.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        const { params } = this.props.match;
        if (params.name && prevProps.currentForum.name !== params.name) {
            this.props.fetchForumByName(this.props.match.params.name);
        }
        if (this.props.currentForum.id !== prevProps.currentForum.id) {

            this.setState({
                currentForum: {
                    posts: this.props.currentForum.posts.map(item => ({ id: item.id, renderPost: false }))
                }
            });

        }

        if (this.props.currentForum.newPost.id !== prevProps.currentForum.newPost.id) {

            const posts = [...this.state.currentForum.posts];
            posts.unshift({ id: this.props.currentForum.newPost.id, renderPost: false });
            this.setState({ currentForum: { posts: posts } }, console.log(this.props));
        }

    }
    componentDidMount() {
        this.props.fetchForumByName(this.props.match.params.name);
    }

    handlePostRender = (e, index) => {
        //add a render: true to render comments in a using the index of the post 
        //https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate

        let posts = [...this.state.currentForum.posts];

        //the first time it runs will create a new rednerCommet attribute and flip the undefined attribute to true with !
        //afterwards it will just flip the boolean with !


        let post = { ...posts[index], renderPost: !this.state.currentForum.posts[index].renderPost };

        posts[index] = post;

        //https://www.codegrepper.com/code-examples/delphi/how+to+update+a+single+attribute+in+object+in+setstate+in+react
        this.setState(prevState => (
            {
                currentForum: {
                    ...prevState.currentForum,
                    posts: posts
                }
            }));

    }

    handlePost(event) {
        event.preventDefault();
        const title = event.target.newPostTitle.value;
        const content = event.target.newPostContent.value;
        if (!title || !content) {
            alert("Please fill in a title and a content for the post.");
        } else {

            this.props.createPostByForumID(
                {
                    forum_id: this.props.currentForum.id,
                    title: title,
                    content: content
                }
            );


        }
    }

    handleCommentRender(event) {
        event.preventDefault();
        const comment = event.target.comment.value;
        if (!comment) {
            alert("Please dont enter an empty comment.");
        } else {
            // axios
            //     .post(`${API_URL}/forum/${this.props.match.params.name}/${event.target.id}`, {
            //         author: this.props.user.displayName,
            //         content: comment,
            //     })
            //     .then(response => {
            //         let updatePost = { ...this.state.forum.post }

            //         updatePost[event.target.attributes.index.value].comment = response.data;
            //         console.log(updatePost);
            //         console.log(this.state);
            //         this.setState(prevState => (
            //             {
            //                 forum: {
            //                     ...prevState.forum,
            //                     post: { ...prevState.forum.post, comment: response.data }
            //                 }
            //             }
            //         ))
            //     })
            //     .catch(error => console.log(error));

        }

    }
    render() {


        if (this.props.currentForum && this.state.currentForum) {
            const { name, description, updated_at, posts } = this.props.currentForum;

            return (
                <main className="forum-name">
                    <h1>{name}</h1>
                    <p className="forum-name__details">Created {timeDisplay(updated_at)}</p>
                    <p className="forum-name__description">{description}</p>
                    <form className="forum-name__text-input" onSubmit={this.handlePost}>

                        <label className='label' htmlFor="newPostTitle">Title</label>
                        <input className='forum-name__text' type="text" id="newPostTitle" placeholder="Relevant to the forum" autoComplete="off" />
                        <label className='label' htmlFor="newPostContent">Content</label>
                        <textarea className='forum-name__textarea' id="newPostContent" type='texarea' placeholder="Elaborate on the topic" />
                        <button className="forum-name__btn" value="Submit">Post</button>

                    </form>
                    <section>
                        {posts && posts.map((item, index) =>
                            <div className="forum-name__post" key={item.id} onClick={e => this.handlePostRender(e, index)}>
                                <h2>{item.title}</h2>
                                <p className="forum-name__post__time-stamp">Posted {timeDisplay(item.updated_at)}</p>
                                {this.state.currentForum.posts[index] && this.state.currentForum.posts[index].renderPost &&
                                    <p className="forum-name__post__content">{item.content}</p>
                                }
                                <button className="forum-name__post__btn--comment" onClick={this.handleCommentRender} > Comments</button>
                                {/* 
                                {this.state.forum.post[index].renderComment &&
                                    <form className="forum-name__post__comment" onSubmit={this.handleComment} id={item.title} index={index}>
                                        <textarea className='forum-name__post__comment__textarea' id="comment" type='texarea' placeholder="respect others!" />
                                        <button className="forum-name__post__comment__btn" type='sumbit'>Enter</button>
                                    </form>
                                }
                                {this.state.forum.post[index].renderComment &&
                                    sortByDate(this.state.forum.post[index].comment).map(item => <p>{item.author} said: "{item.content}" {timeDisplay(item.timestamp)}</p>)
                                } */}
                            </div>
                        )}

                    </section>
                </main>
            );
        } else { return null }

    }
}

ForumName.propTypes = {
    fetchForumByName: PropTypes.func.isRequired,
    currentForum: PropTypes.object.isRequired,
    createPostByForumID: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {

    return {

        currentForum: state.forums.currentForum
    };
};
export default connect(mapStateToProps, { fetchForumByName, createPostByForumID })(ForumName);
