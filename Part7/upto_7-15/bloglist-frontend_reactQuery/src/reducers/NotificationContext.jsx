import { createContext, useReducer, useContext } from 'react'

export const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return {
                message: action.payload,
                type: 'notification'
            }
        case 'SET_ERROR':
            return {
                message: action.payload,
                type: 'error'
            }
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, dispatch] = useReducer(notificationReducer, {
        message: null,
        type: null
    })

    return (
        <NotificationContext.Provider value={[ notification, dispatch ]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export default NotificationContext
