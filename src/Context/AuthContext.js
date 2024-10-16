import React, { createContext, useEffect, useState } from 'react'

export const authContext = createContext();

export default function AuthContextProvider({children}) {
    const [token, setToken] = useState(null);

    useEffect(function(){
        const valueLocalStorage = localStorage.getItem("tokenFreshCart");
        if (valueLocalStorage != null) {
            setToken(valueLocalStorage);
        }
    },[])

    return <authContext.Provider value={ {token, setToken} }>
        {children}
    </authContext.Provider>
}
