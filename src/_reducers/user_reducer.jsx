import {
    LOGIN_USER,
    SIGNUP_USER,
    REGISTER_PATIENT,
    PAYMENT,
} from '../_actions/types';

export default function(state={}, action) {
    switch(action.type) {
        case LOGIN_USER:
            return { ...state, Login: action.payload }
            break;
        case SIGNUP_USER:
            return { ...state, Signup: action.payload }
            break;
        case REGISTER_PATIENT:
            return { ...state, Register: action.payload }
            break;  
        case PAYMENT:
            return { ...state, Payment: action.payload }
            break;  
        default:
            return state;
    }
}
