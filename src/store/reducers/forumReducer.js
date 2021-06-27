import axios from "axios";
import { connect } from "react-redux";
import { API_URL } from "../../App";


const GET_FORUMS = "GET_FORUMS";
const ADD_FORUM = "ADD_FORUM";

const initialState = {
    items: [],
    item: {}
}

export const fetchForums = () => dispatch => {

    axios.get(`${API_URL}/forums`)
        .then(res => res.data)
        .then(forums => dispatch(({
            type: GET_FORUMS,
            payload: forums
        })))
        .catch(error => console.log(error));

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FORUMS:

            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}



export default reducer;