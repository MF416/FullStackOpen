import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({

    name: 'notification',
    initialState: null,
    reducers: {
        setNotificationContent(state, action) {
        return action.payload
        },
        clearNotification(state, action) {
        return null
        }
    }
})

export const { setNotificationContent, clearNotification } = notificationSlice.actions

export const setNotification = (content, timeout) => {
    return async dispatch => {
        dispatch(setNotificationContent(content))
        setTimeout(() => {
            dispatch(clearNotification('test'))
        }, timeout)
    }
}

export default notificationSlice.reducer