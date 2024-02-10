import { createContext, useReducer, useContext } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

export const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload
        default:
            return state
    }
}

const userContext = createContext()

export const UserContextProvider = (props) => {
    const [user, dispatch] = useReducer(userReducer, null)

    return (
        <userContext.Provider value={[ user, dispatch ]}>
            {props.children}
        </userContext.Provider>
    )
};

export const useUserValue = () => {
    const [user, _dispatch] = useContext(userContext)
    return user
}

export const useUserDispatch = () => {
    const [_user, dispatch] = useContext(userContext)
    return dispatch
}

export default userContext