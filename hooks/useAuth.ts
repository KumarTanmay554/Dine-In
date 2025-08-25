import { Authcontext } from "@/app/context/AuthContext";
import { deleteCookie } from "cookies-next";
import { useContext } from "react";
import { fetchClientServerAction } from "../utils/fetch";
import { useRouter } from "next/navigation";

const useAuth = () => {
  // User ka data global rakhna samaj, loading state sirf ek jagah rakni chaiye
  // Header
  const { data, error, loading, setAuthState } = useContext(Authcontext);
  const router = useRouter();

  //   Signin
  const signin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setAuthState({ loading: true, data: null, error: null });
    const action = async()=>{
      return await fetchClientServerAction(async()=>{
        const res = await fetch("http://localhost:3000/api/auth/signin",
          {
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({email,password})
          }
        )
        const data = await res.json();
        if(!res.ok){
          return {error:data.error}
        }
        return {data}
      })
    };

    try {
      const {data: res, error:resError} = await action();
      if(resError){
        setAuthState({
          loading:false,
          data:null,
          error:resError
        })
      }else{
        setAuthState({loading:false,data:res,error:null})
        router.push("/");
      }
      // console.log(res);
    } catch (error: any) {
      // todo
      setAuthState({
        loading: false,
        data: null,
        error: error.response ? error.response.data.error : error.message && "signin failed",
      });
    }
  };

  //   Signup
  const signup = async ({
    email,
    password,
    firstName,
    lastName,
    city,
    phone,
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
  }) => {
    try {
      // ;-)
      const res = await fetch("http://localhost:3000/api/auth/signup",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password,firstName,lastName,city,phone})
      });
      console.log("Signup response:", res);
      const resd = await res.json()
      setAuthState({ loading: false, data: resd, error: null });
      router.push("/");
    } catch (error: any) {
      setAuthState({
        loading: false,
        data: null,
        error: error.response ? error.response.data.error : error.message && "signup failed",
      });
    }
  };

  //   Logout
  const logout = () => {
    deleteCookie("token");
    
    setAuthState({ loading: false, data: null, error: null });
    router.refresh();
  };
  return { signin, signup, logout };
};

export default useAuth;
