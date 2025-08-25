"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import AuthContext, { Authcontext } from "../context/AuthContext";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import signin from "../../../pages/api/auth/signin";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  // Router
  // const router = useRouter();

  // const {error,loading,data,setAuthState} = useContext(AuthContext);
  // const {signin} = useAuth();
  // Form State
  const [input, setInput] = useState({
    // 1
    email: "",
    password: "",
  });

  // Loading state
  const [loading, setLoading] = useState(false); // 2
  const [error, setError] = useState(""); // 3

  const disable = input.email === "" || input.password === "" || loading;
  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const { email, password } = input;
      const { data, error } = await signin({ email, password });
      console.log(data, error);
      if (error) {
        setError(error?.message ?? error?.error ?? error);
        return;
      }
      // router.push("/");
    } catch (error: any) {
      setError(error?.message ?? error?.error ?? error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
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

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="password" className="text-right">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          className="col-span-3"
          onChange={(e) => {
            setInput({ ...input, password: e.target.value });
          }}
        />
      </div>
      {loading && (
        <div>
          <Progress value={90} />
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-600 p-2 rounded-md">
          {error}
        </div>
      )}
      <Button
        type="submit"
        className="bg-red-600"
        disabled={disable}
        onClick={handleLogin}
      >
        Signin
      </Button>
    </div>
  );
}
