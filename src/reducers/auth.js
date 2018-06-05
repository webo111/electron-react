import * as type from '../actions/type';

const handleData = (state = {isFetching: true, data: {}}, action) => {
    switch (action.type) {
        case type.REQUEST_AUTH_DATA:
            return {...state, isFetching: true};
        case type.RECEIVE_AUTH_DATA:
            return {...state, isFetching: false, data: action.data};
        default:
            return {...state};
    }
};

const auth = (state = {}, action) => {
    switch (action.type) {
        case type.REQUEST_AUTH_DATA:
        case type.RECEIVE_AUTH_DATA:
            return {
                ...state,
                [action.category]: handleData(state[action.category], action)
            };
        default:
            return {...state};
    }
};

export default auth;
