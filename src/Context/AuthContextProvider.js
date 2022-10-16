import { useContext } from "react";
import { createContext } from "react";
import React from "react";
import { useSelector } from "react-redux";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const islogged = useSelector((state) => state.app.isLogged);
  console.log(islogged);
  return (
    <AuthContext.Provider value={islogged}>{children}</AuthContext.Provider>
  );
}
export default AuthContextProvider;

export function useAuth() {
  return useContext(AuthContext);
}
