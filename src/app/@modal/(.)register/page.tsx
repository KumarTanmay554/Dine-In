"use client"
import RegisterForm from "@/app/components/RegisterForm"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"


export default function SignUp() {
    const router = useRouter();
  
  return (
    <Dialog defaultOpen={true} onOpenChange={router.back}>
      <DialogTrigger className="bg-blue-400 text-white border p-1 px-4 rounded mr-3">Sign Up</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Create Account</DialogTitle>
        </DialogHeader>
        
        <RegisterForm/>

      </DialogContent>
    </Dialog>
  )
}
