import { SIGNUP_ATTEMPT, SIGNUP_FAILED, SIGNUP_SUCCESS } from "../actions/types";


const INITIAL_STATE = { success: false, loading: false, message: '' };


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGNUP_ATTEMPT:
            return { ...state,success:false, loading: true };
        case SIGNUP_SUCCESS:
            return { ...state, success: true,loading:false, message: action.message }
        case SIGNUP_FAILED:
            return { ...state,success:false, loading:false, message: action.message };
        default:
            return state;

    }
}