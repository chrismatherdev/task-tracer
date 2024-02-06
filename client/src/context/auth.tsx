import React, { createContext, useReducer, ReactNode, Dispatch, useEffect, useMemo } from 'react';
import { User } from '../interfaces/user';

interface AuthState {
  user: User | null;
}

interface AuthAction {
  type: 'LOGIN' | 'LOGOUT';
  payload?: User | null;
}

interface AuthContextProps {
  user: User | null;
  dispatch: Dispatch<AuthAction>;
}

const initialState: AuthState = {
  user: null,
};

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload! };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const authContextValue = useMemo(() => ({ user: state.user, dispatch }), [state.user, dispatch]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
