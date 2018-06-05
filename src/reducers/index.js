import * as type from '../actions/type';
import { combineReducers } from 'redux';
import auth from './auth';

const httpData = (state = {}, action) => {
    switch (action.type) {
        case type.REQUEST_DATA:
            return { ...state, isFetching: true };
        case type.RECEIVE_DATA:
            return {...state, isFetching: false, data: action.data};
        default:
            return {...state};
    }
};


export default combineReducers({
    httpData,
    auth
});