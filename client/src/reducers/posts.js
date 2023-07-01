import { CREATE, UPDATE, DELETE, COMMENT, FETCH_USER_POSTS, FETCH_USER_SAVED_POSTS,
    FETCH_ALL, FETCH_BY_SEARCH, LIKE,
    START_LOADING, END_LOADING, FETCH_POST, SAVE } from '../constants/actionTypes.js';

export default (state = { isLoading: true, posts: []}, action) => {
    switch (action.type) {
        case START_LOADING:
            return {...state, isLoading: true };
        case END_LOADING:
            return {...state, isLoading: false };
        case FETCH_POST: 
            return { 
                ...state,
                post: action.payload.data,
                randomPosts: action.payload.randomData,
                postsByCreator: action.payload.postsByCreator,
                postsByTags: action.payload.postsByTags,
            };
        case FETCH_ALL: 
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_USER_POSTS:
            return {
                ...state,
                userPosts: action.payload.data,
            }
        case FETCH_USER_SAVED_POSTS:
            return {
                ...state,
                userSavedPosts: action.payload.data,
            }
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload
            };
        case LIKE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case SAVE:
            return { 
                ...state, 
                posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)),
                savedPost: action.payload,
            };
        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                if (post._id == +action.payload._id) {
                    return action.payload;
                }
                return post;
                }),
            };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        default:
            return state;
    }
}