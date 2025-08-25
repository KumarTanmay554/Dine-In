"use client"
import LoginForm from "@/app/components/LoginForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter()
  return (
    <Dialog defaultOpen={true} onOpenChange={router.back}>
        <DialogTrigger asChild>
        <Button variant="outline">Sign In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Sign In</DialogTitle> 
        </DialogHeader>

        <LoginForm />
        
      </DialogContent>
    </Dialog>
  );
}
