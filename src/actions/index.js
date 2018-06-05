import * as type from './type';
import * as http from '../axios/index';

const requestData = category => ({
    type: type.REQUEST_DATA,
    category
});
export const receiveData = (data, category) => ({
    type: type.RECEIVE_DATA,
    data,
    category
});
/**
 * 请求数据调用方法
 * @param funcName      请求接口的函数名
 * @param params        请求接口的参数
 */
export const fetchData = ({funcName, params, stateName}) => dispatch => {
    !stateName && (stateName = funcName);
    dispatch(requestData(stateName));
    return http[funcName](params).then(res => {
        dispatch(receiveData(res, stateName));
    });
};
//auth fetch data
const requestAuthData = category => ({
    type: type.REQUEST_AUTH_DATA,
    category
});
export const receiveAuthData = (data, category) => ({
    type: type.RECEIVE_AUTH_DATA,
    data,
    category
});
/**
 * 请求数据调用方法
 * @param funcName      请求接口的函数名
 * @param params        请求接口的参数
 */
export const fetchAuthData = ({funcName, params, stateName}) => dispatch => {
    !stateName && (stateName = funcName);
    dispatch(requestAuthData(stateName));
    return http[funcName](params).then(res => {
        dispatch(receiveAuthData(res, stateName));
    });
};