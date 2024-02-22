import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';


const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload;
        }
    }
});

export const initializeUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            blogService.setToken(user.token);
            dispatch(setUser(user));
        }
    }
}

export const loginUser = (username, password) => {
    
    return async dispatch => {
        try {
            const user = await loginService.login({ username, password });
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
            blogService.setToken(user.token);
            dispatch(setUser(user)); 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};

export const logoutUser = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedBlogappUser');
        dispatch(setUser(null));
    }
};

export const { setUser } = userSlice.actions;
export default userSlice.reducer;