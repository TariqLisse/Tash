import {createContext} from 'react';

// Credentials Context
export const CredentialsContext = createContext({storedCredentials: {}, setStoredCredentials: () => {}});