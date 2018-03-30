import { SIGNUP_ATTEMPT, SIGNUP_FAILED, SIGNUP_SUCCESS } from "./types";

import axios from "axios";


const signUser = ({ username, email, password }) => {
    return (dispatch) => {
        dispatch({ type: SIGNUP_ATTEMPT });
    
        axios.post('http://localhost:3000/users/register', { username, email, password })
        .then(resp => {
            console.log(resp);
            dispatch({ type: SIGNUP_SUCCESS, message: resp.data.message })
        })
        .catch(
            error => {
                dispatch({type: SIGNUP_FAILED, message: 'email existe deja'})
            }
        );
    
    
    
    };


   

}

export {signUser};

