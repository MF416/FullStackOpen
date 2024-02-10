import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';


const userListSlice = createSlice({
    name: 'userList',
    initialState: [],
    reducers: {
        setUserList(state, action) {
            return action.payload;
        }
    }
});

export const initializeUserList = () => {
    return async dispatch => {
        const users = await userService.getAll();
        dispatch(setUserList(users));
    }
};


export const { setUserList } = userListSlice.actions;
export default userListSlice.reducer;
