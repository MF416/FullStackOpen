import { useReducer, createContext } from 'react'

const NotificationContext = createContext()

const setNotificationContent = (state, action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            return action.payload
        case 'CLEAR_NOTIFICATION':
            return null
        default:
            return state
    
    }
}


export const NotificationContextProvider = (props) => {
    const [notification, setNotification] = useReducer(setNotificationContent, null)

    return (
        <NotificationContext.Provider value={[ notification, setNotification ]}>
            {props.children}
        </NotificationContext.Provider>
    )
}


export default NotificationContext