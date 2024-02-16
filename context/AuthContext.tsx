"use client"

import { createContext, useEffect, useState } from "react";

interface AuthContextProviderProps {
    children: React.ReactNode;
  }
 // @ts-ignore: Unreachable code error
export const AuthContext = createContext(); 

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({children}) =>{
    // @ts-ignore
     const [userData, setUserData]=useState(null);
     useEffect(() => {
        // @ts-ignore
        const data = localStorage.getItem('forms') || null;

        if(data){
            setUserData(JSON.parse(data));
        }
      }, []);

      console.log(userData);
    
      return (
        <AuthContext.Provider value={{ userData, setUserData }}>
          {children}
        </AuthContext.Provider>
      );
}
