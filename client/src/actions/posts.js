import * as api from '../api/index.js';
import { CREATE, UPDATE, DELETE, LIKE, COMMENT, FETCH_USER_POSTS,
    FETCH_POST, FETCH_ALL, FETCH_BY_SEARCH, SAVE,
    START_LOADING, END_LOADING, FETCH_USER_SAVED_POSTS } from '../constants/actionTypes.js';


//Action creators
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING }); 

        const { data } = await api.fetchPost(id);

        dispatch({ type: FETCH_POST, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error)
    }
};

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchPosts(page);

        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error)
    }
};

export const getUserPosts = (userId) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchUserPosts(userId);

        dispatch({ type: FETCH_USER_POSTS, payload: data });

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error)
        console.log('in action user posts')
    }
};

export const getUserSavedPosts = (userId) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchUserSavedPosts(userId);

        dispatch({ type: FETCH_USER_SAVED_POSTS, payload: data });

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error)
        console.log('in action saved')
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const {data: {data}} = await api.fetchPostsBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: data })
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data  });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({type: UPDATE, payload: data });
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    try {
        const { data } = await api.likePost(id, user?.token);

        dispatch({type: LIKE, payload: data });
    } catch (error) {
        console.log(error)
    }
}

export const savePost = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    try {
        const { data } = await api.savePost(id, user?.token);

        dispatch({type: SAVE, payload: data });
    } catch (error) {
        console.log(error)
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id);

        dispatch({ type: COMMENT, payload: data });

        return data.comments;
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error);
    }
}