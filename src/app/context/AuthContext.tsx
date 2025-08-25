"use client"
import React, { createContext, useEffect, useState } from 'react';
// import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import { getCookie } from 'cookies-next';
// import { fetchClient } from '../../../utils/fetch';
import { getuserbyToken } from '../../../pages/api/auth/tokenuse';

interface User{
    id:number;
    email:string;
    firstName:string;
    lastName:string;
    city:string;
    phone:string;
}

interface State{
    loading:boolean,
    data:User|null,
    error:string | null
}
interface AuthState extends State{
    setAuthState:React.Dispatch<React.SetStateAction<State>>
}

export const Authcontext = createContext<AuthState>({
    loading:false,
    data:null,
    error:null,
    setAuthState:()=>{}
})

export default function AuthContext({children}:{children:React.ReactNode}){
    // Individual me 
    const [authState, setAuthState] = useState<State>({
        loading:true,
        data:null,
        error:null
    })

    const fetchUser=async()=>{
        setAuthState({loading:true,data:null,error:null})
        try{
            const jwt = getCookie("token");
            if(!jwt){
                setAuthState({loading:false,data:null,error:"User not found"});
                return;
            }
            const {data,error} = await getuserbyToken();
            // const res = await axios.get("http://localhost:3000/api/auth/tokenuse",{
            //     headers:{
            //         Authorization:`Bearer ${jwt}`
            //     }
            // })

            if(error){
                setAuthState({loading:false,data:null,error:error.message??error.error??error})
            }else{
                axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
                setAuthState({loading:false, data:data,error:null});

            }

            // Set the token in the axios header

            // console.log(res.data)
            // setAuthState({loading:false,data:res.data,error:null})
        }catch(error:any){
            console.log({error})
            setAuthState({loading:false,data:null,error:error.response})
        }
    }

    useEffect(()=>{fetchUser()},[])
    return (
        <Authcontext.Provider value={{...authState,setAuthState}}>
            {/* {JSON.stringify(authState)} */}
            {children}
        </Authcontext.Provider>
    )
}