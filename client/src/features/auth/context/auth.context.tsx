import { createContext, useContext, useReducer } from 'react';
import { AuthContextType, ContextPropsType, reducerActionType, reducerStateType } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

const initialState: reducerStateType = {
    currentUser: null,
    userRole: '',
    userId: '',
};

function reducer(state: reducerStateType, action: reducerActionType): reducerStateType {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return { ...state, currentUser: action.payload };
        case 'SET_USER_ROLE':
            return { ...state, userRole: action.payload };
        case 'SET_USER_ID':
            return { ...state, userId: action.payload };
        case 'RESET_AUTH':
            return initialState;
        default:
            return state;
    }
}

export function AuthContextProvider({ children }: ContextPropsType) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuthContext must be used within an AuthContextProvider');
    return context;
}