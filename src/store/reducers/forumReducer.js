import axios from "axios";
import { API_URL } from "../../App";


const GET_FORUMS = "GET_FORUMS";
const ADD_FORUM = "ADD_FORUM";
const GET_FORUM_BYNAME = "GET_FORUM_BYNAME";

const initialState = {
    list: [],
    item: {},
    currentForum: {}
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
                item: action.payload
            }
        case GET_FORUM_BYNAME:
            return {
                ...state,
                currentForum: action.payload
            }
        default:
            return state;
    }
}



export default reducer;