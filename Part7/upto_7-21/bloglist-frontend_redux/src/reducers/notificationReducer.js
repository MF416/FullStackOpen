import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        message: null,
        type: null
    },
    reducers: {
        setNotification(state, action) {
            return { message: action.payload, type: 'notification' }
        },
        setError(state, action) {
            return { message: action.payload, type: 'error' }
        }
    }

});

export const { setNotification, setError } = notificationSlice.actions;
export default notificationSlice.reducer;