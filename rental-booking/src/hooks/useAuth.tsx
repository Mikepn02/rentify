/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/@types/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../lib/axios.config";
import { notifications } from "@mantine/notifications";
import {  deleteCookie, setCookie } from "@/lib/utils";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (
    user: Omit<User, "id"> & {
      password: string;
    }
  ) => void;
  logout: () => void;
  loggingIn: boolean;
  loggingOut: boolean;
  registering: boolean;
  initialLoading: boolean;
  signInWithGoogle: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggingIn, setLoggingIn] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [user, setUser] = useState<User | null>(null);


  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      setInitialLoading(true);
      try {
        const { data } = await axios.get("/auth/me");
        setUser(data.user);
      } catch (error) {
        setUser(null);
        if (location.pathname.startsWith("/dashboard")) {
          navigate("/login", { replace: true });
        }
        console.log("Error fetching user: ", error);
      } finally {
        setInitialLoading(false);
      }
    };
  
    if (!user) {
      fetchUser();
    }
  }, [location.pathname]);
  

  const register = async (user: Omit<User, "id">) => {
    try {
      const { data } = await axios.post("/auth/register", user);
      if (data.success) {
        notifications.show({
          title: "Success",
          message: "Account created successfully",
          color: "green",
        });
        navigate("/login");
      } else {
        notifications.show({
          message: "something went wrong",
          color: "red",
        });
      }
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.response?.data?.message ?? "An error occured",
        color: "red",
      });
    } finally {
      setRegistering(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoggingIn(true)
    try {
      const { data } = await axios.post("/auth/login", { email, password });
      setUser(data.user);
      setCookie("token", data.token, 7);
      notifications.show({
        title: "Success",
        message: "Logged in successfully",
        color: "green",
      });
      navigate("/dashboard");
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Invalid email or password",
        color: "red",
      });
    }finally{
      setLoggingIn(false)
    }
  };

  const signInWithGoogle = () => {
    window.location.href = "http://localhost:8000/api/v1/auth/google";
  };
  
  const logout = async () => {
    setLoggingOut(true)
    try {
      await axios.post("/auth/logout");
      deleteCookie("token")
      notifications.show({
        title: "Success",
        message: "Successfully Logged out",
        color: "green",
      });
      navigate("/login", { replace: true})
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to Login with Google",
        color: "red",
      });
    }finally{
      setLoggingOut(false)
    }
  };

  return (
    <AuthContext.Provider
    
     value={{
        user,
        register,
        registering,
        loggingIn,
        loggingOut,
        logout,
        login,
        initialLoading,
        signInWithGoogle
     }}
    >{children}</AuthContext.Provider>
  )
};


export default function useAuth(){
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
