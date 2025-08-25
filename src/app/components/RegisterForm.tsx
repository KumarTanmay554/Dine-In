"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState, useContext } from 'react'
import useAuth from '../../../hooks/useAuth';
import { Authcontext } from '../context/AuthContext';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import signup from '../../../pages/api/auth/signup';

// import { validationSchema } from '../../../pages/api/auth/signup';
// import { handleRegister } from '@/actions/sign';

export default function RegisterForm() {
    const [input, setInput] = useState({
        email : "",
        password : "",
        firstName : "",
        lastName : "",
        city:"",
        phone:"",
  });
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  // const {error,loading,data,setAuthState} = useContext(Authcontext);
  // const {signup} = useAuth();
  const router = useRouter();
  // const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // const [disabled,setDisable] = useState(true);
  const disabled = input.email === "" || input.password === "" || input.firstName === "" || input.lastName === "" || input.city === "" || input.phone === "" || loading;

  // useEffect(()=>{
  //   if(input.email.length>0 && input.password.length>0 && input.firstName.length>0 && input.lastName.length>0 && input.city.length>0 && input.phone.length>0){
  //     return setDisable(false);
  //   }else{
  //     return setDisable(true);
  //   }
  // }, [input]);

  
    const handleClick = async()=>{
      setLoading(true);
      setError("");
      try {
        const {email,password,firstName,lastName,city,phone} = input;
        const {data,error} = await signup({email,password,firstName,lastName,city,phone});
        if(error){
          setError(error?.message ?? error?.error ?? error);
          return;
        }
      }catch(error:any){
        setError(error?.message ?? error?.error ?? error);
      }finally{
        setLoading(false);
      }
      // signup({email:input.email,password:input.password,firstName:input.firstName,lastName:input.lastName,city:input.city,phone:input.phone});
      // router.push("/");
    }

  return (
    <div>
      {loading ? (
        <Progress value={90} />

      ) : (
        
        <div>
          <div className="grid grid-cols-4 items-center gap-4 m-2">
            <Label htmlFor="firstName" className="text-right">
              First Name
            </Label>
            <Input
              id="firstName"
              placeholder="First Name"
              className="col-span-2"
              onChange={(e) => {
                setInput({ ...input, firstName: e.target.value });
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 m-2">
            <Label htmlFor="lastName" className="text-right">
              Last Name
            </Label>
            <Input
              id="lastName"
              placeholder="Last Name"
              className="col-span-2"
              onChange={(e) => {
                setInput({ ...input, lastName: e.target.value });
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 m-2">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              placeholder="xyz@gmail.com"
              className="col-span-3"
              onChange={(e) => {
                setInput({ ...input, email: e.target.value });
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 m-2">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Enter your Password"
              className="col-span-3"
              type="password"
              onChange={(e) => {
                setInput({ ...input, password: e.target.value });
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 m-2">
            <Label htmlFor="city" className="text-right">
              City
            </Label>
            <Input
              id="city"
              placeholder="City"
              className="col-span-2"
              onChange={(e) => {
                setInput({ ...input, city: e.target.value });
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 m-2">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              placeholder="XXXXXXXX89"
              className="col-span-2"
              onChange={(e) => {
                setInput({ ...input, phone: e.target.value });
              }}
            />
          </div>
          {loading && (
            <div>
              <Progress value={90} />
            </div>
          )}
          {error && (
            <div className='bg-red-100 text-red-600 p-2 rounded-md'>
              {error}
            </div>
          )}
          <Button
            type="submit"
            className="bg-red-600"
            disabled={disabled}
            onClick={handleClick}
          >
            Signup
          </Button>
        </div>
      )}
    </div>
  )
}
