import axios from "axios";

import {
    LOGIN_USER,
    SIGNUP_USER
} from './types';

export function loginUser(dataToSubmit) {
    const request = axios.post('http://3.35.231.145:8080/api/auth/signin', dataToSubmit)
        .then( response => console.log('AXIOS:', response) )
        .then( response => response.data )

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function signupUser(dataToSubmit) {
    const request = axios.post('http://3.35.231.145:8080/api/auth/signup', dataToSubmit)
        // .then( response => console.log(response) )
        .then( response => response.data )

    //request를 reducer에 넘겨줌
    return {
        type: SIGNUP_USER,
        payload: request
    }
}