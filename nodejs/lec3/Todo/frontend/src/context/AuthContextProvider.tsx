import React, { createContext, useContext, useEffect, useState } from "react"

interface IUser{
  username:string;
  email:string;
  _id:string;
}

interface IAuthContext{
  user:IUser | null;
  setUser:React.Dispatch<React.SetStateAction<IUser | null>>
}

const AuthContext = createContext<IAuthContext>({
  user:null,
  setUser: ()=>{}
});

const AuthContextProvider = ({children}:{children:React.ReactNode}) => {
  
  const [user, setUser] = useState<IUser | null>(null);
  
  useEffect(()=>{
    console.log(user);
    
  }, []);

  
  return (
    <AuthContext value={{user, setUser}}>
      {children}
    </AuthContext>
  )
}

export const useAuthContext = ()=>{
    return useContext(AuthContext);
}

export default AuthContextProvider;
