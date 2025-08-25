"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";
import RegisterForm from "./RegisterForm"

export default function SignUp() {
  
  return (
    <Dialog>
  <DialogTrigger className="bg-blue-400 text-white border p-1 px-4 rounded mr-3">Sign Up</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="text-center">Create Account</DialogTitle>
    </DialogHeader>
    <RegisterForm/>
    
      {/* <DialogFooter>
      
    </DialogFooter> */}
  </DialogContent>
</Dialog>
  )
}
