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
            forum: {
                post: []
            }
        }
        this.handlePost = this.handlePost.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        const { params } = this.props.match;

        if (params.name && prevState.forum.name !== params.name) {
            this.getForum(params.name);

        }
    }
    componentDidMount() {
        this.props.fetchForumByName(this.props.match.params.name);
    }
    getForum(name) {
        axios.get(`${API_URL}/forum/${name}`)
            .then(response => this.setState({ forum: response.data[0] }))
            .catch(error => console.log(error));
    }
    handleClick = (e) => {
        //add a render: true to render comments in a using the index of the post 
        //https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate

        let posts = [...this.state.forum.post];

        //the first time it runs will create a new rednerCommet attribute and flip the undefined attribute to true with !
        //afterwards it will just flip the boolean with !
        let post = { ...posts[e.target.value], renderComment: !this.state.forum.post[e.target.value].renderComment };

        posts[e.target.value] = post;

        //https://www.codegrepper.com/code-examples/delphi/how+to+update+a+single+attribute+in+object+in+setstate+in+react
        this.setState(prevState => (
            {
                forum: {
                    ...prevState.forum,
                    post: posts
                }
            }));
        console.log(this.state.forum.post);
    }
    handlePost(event) {
        event.preventDefault();
        const title = event.target.name.value;
        const content = event.target.description.value;
        if (!title || !content) {
            alert("Please fill in a title and a content for the post.");
        } else {
            axios
                .post(`${API_URL}/forum/${this.props.match.params.name}`, {
                    title: title,
                    author: this.props.user.displayName,
                    content: content,
                })
                .then(response => {

                    alert("Post created");
                    this.componentDidMount();
                })
                .catch(error => console.log(error));
        }
    }
    handleComment(event) {
        event.preventDefault();
        const comment = event.target.comment.value;
        if (!comment) {
            alert("Please dont enter an empty comment.");
        } else {
            axios
                .post(`${API_URL}/forum/${this.props.match.params.name}/${event.target.id}`, {
                    author: this.props.user.displayName,
                    content: comment,
                })
                .then(response => {
                    this.componentDidMount();
                    // let updatePost = { ...this.state.forum.post }

                    // updatePost[event.target.attributes.index.value].comment = response.data;
                    // console.log(updatePost);
                    // console.log(this.state);
                    // this.setState(prevState => (
                    //     {
                    //         forum: {
                    //             ...prevState.forum,
                    //             post: { ...prevState.forum.post, comment: response.data }
                    //         }
                    //     }
                    // ))
                })
                .catch(error => console.log(error));

        }

    }
    render() {



        if (this.props.currentForum) {

            const { name, description, updated_at, posts } = this.props.currentForum;
            return (
                <main className="forum-name">
                    <h1>{name}</h1>
                    <p className="forum-name__details">Created {timeDisplay(updated_at)}</p>
                    <p className="forum-name__description">{description}</p>
                    <form className="forum-name__text-input" onSubmit={this.handlePost}>

                        <label className='label' htmlFor="name">Title</label>
                        <input className='forum-name__text' type="text" id="name" placeholder="Relevant to the forum" autoComplete="off" />
                        <label className='label' htmlFor="description">Content</label>
                        <textarea className='forum-name__textarea' id="description" type='texarea' placeholder="Elaborate on the topic" />
                        <button className="forum-name__btn" value="Submit">Post</button>

                    </form>
                    <section>
                        {posts && sortByDate(posts).map((item, index) =>
                            <div className="forum-name__post">
                                <h2>{item.title}</h2>
                                <p>Posted {timeDisplay(item.updated_at)}</p>
                                {/* <button className="forum-name__post__btn--comment" onClick={this.handleClick} value={index}>{item.comment.length} Comments</button>
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
}

const mapStateToProps = (state) => {

    return {

        currentForum: state.forums.currentForum
    };
};
export default connect(mapStateToProps, { fetchForumByName })(ForumName);

const sortByDate = (arr) => arr.sort((a, b) => b.timestamp - a.timestamp);