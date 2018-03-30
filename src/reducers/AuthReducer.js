import { LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILED } from "../actions/types";

const INITIAL_STATE = { user: null, loading: false, error: '' }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_ATTEMPT:
            return { ...state, loading: true};
        case LOGIN_SUCCESS:
            return { ...state, loading: false, user: action.user};
        case LOGIN_FAILED:
            return { ...state, loading: false, error: action.error};
        default:
            return state;
    }
}