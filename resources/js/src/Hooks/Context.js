import React, {createContext} from 'react';

const context = createContext({
    token: null,
    user: null,
    signIn: () => {},
    signOut: () => {}
});

export default context;
