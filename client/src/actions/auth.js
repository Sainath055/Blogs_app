import * as api from '../api/index.js';
import { AUTH } from '../constants/actionTypes.js';

export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });

        history.push('/') 
    } catch (error) {
        alert(error.response.data.message)
        console.log(error.response.data)
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });

        history.push('/')
    } catch (error) {
        alert(error.response.data.message)
        console.log(error.response.data)
    }
}