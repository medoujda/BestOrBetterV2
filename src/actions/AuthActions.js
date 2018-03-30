import { LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILED } from "./types";
import { AsyncStorage } from "react-native";
import axios from "axios";


const loginUser = ({ username, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_ATTEMPT });
        console.log(username);


        //Call the Back-end
        axios.post('http://localhost:3000/users/auth',
            { email :username, password })
            .then(resp =>
                handleResponse(dispatch,resp.data))
            .catch(error => console.error(error));

    };

     
    function handleResponse(dispatch, data){
        if (!data.success) {
            onLoginFailed(dispatch, data.message);
        }
        else {
            onLoginSuccess(dispatch,data.user,data.token);
        }
    };
    function onLoginSuccess(dispatch, user, token) {
        AsyncStorage.setItem('app_token',token)
        .then(()=>{
            dispatch({ type: LOGIN_SUCCESS, user })
        })
        .catch((err)=>{
            console.log(err);
        })
    };
    function onLoginFailed(dispatch, errorMessage)  {
        dispatch({ type: LOGIN_FAILED, error:errorMessage });
    };
}

export { loginUser };