import axios from "axios";
import { API_URL } from "../../App";


const GET_FORUMS = "GET_FORUMS";
const ADD_FORUM = "ADD_FORUM";
const GET_FORUM_BYNAME = "GET_FORUM_BYNAME";
const GET_FORUM_BYID = "GET_FORUM_BYID";
const ADD_POST = "ADD_POST"


const initialState = {
    list: [],
    newForum: {},
    currentForum: {
        newPost: {}//this prevents undefined errors
    }
}

export const fetchForums = () => dispatch => {

    axios.get(`${API_URL}/forums`)
        .then(res => res.data)
        .then(forums => dispatch({
            type: GET_FORUMS,
            payload: forums
        }))
        .catch(error => console.log(error));

}

export const createForum = (data) => dispatch => {
    axios.post(`${API_URL}/forums`,
        {
            name: data.name,
            description: data.description
        })
        .then(res => res.data)
        .then(forum => dispatch({
            type: ADD_FORUM,
            payload: forum
        })
        )
}
export const fetchForumByName = (name) => dispatch => {

    axios.get(`${API_URL}/forums/name=${name}`)
        .then(res => res.data)
        .then(currentForum => dispatch({
            type: GET_FORUM_BYNAME,
            payload: currentForum
        }))
        .catch(error => console.log(error));

}
export const fetchForumByID = (id) => dispatch => {

    axios.get(`${API_URL}/forums/id=${id}`)
        .then(res => res.data)
        .then(currentForum => dispatch({
            type: GET_FORUM_BYID,
            payload: currentForum
        }))
        .catch(error => console.log(error));

}
export const createPostByForumID = (data) => dispatch => {
    axios
        .post(`${API_URL}/posts/`, {
            forum_id: data.forum_id,
            title: data.title,
            content: data.content,
        })
        .then(res => res.data)
        .then(post => {
            dispatch({
                type: ADD_POST,
                payload: post
            });

        }).catch(error => console.log(error));

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FORUMS:

            return {
                ...state,
                list: action.payload
            }

        case ADD_FORUM:
            return {
                ...state,
                newForum: action.payload
            }
        case GET_FORUM_BYNAME || GET_FORUM_BYID:
            const currentForum = { ...action.payload, newPost: {} }//this prevents undefined errors by having new post set to null
            return {
                ...state,
                currentForum: currentForum
            }
        case ADD_POST:
            const posts = [...state.currentForum.posts];
            posts.unshift(action.payload);
            return {
                ...state,
                currentForum: {
                    ...state.currentForum,
                    posts: posts,
                    newPost: action.payload
                }
            }
        default:
            return state;
    }
}



export default reducer;