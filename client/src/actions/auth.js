import * as api from '../api/index.js';
import { AUTH } from '../constants/actionTypes.js';

export const signin = (formData, history, setLoading) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });

        setLoading(false)
        history.push('/') 
    } catch (error) {
        setLoading(false)
        alert(error.response.data.message)
        console.log(error.response.data)
    }
}

export const signup = (formData, history, setLoading) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });

        setLoading(false)
        history.push('/')
    } catch (error) {
        setLoading(false)
        alert(error.response.data.message)
        console.log(error.response.data)
    }
}