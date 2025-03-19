"use client"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import axios from "axios"
import { useEffect } from "react"
import { useUserStore } from "@/store/store"
import AvatarDropdown from "./Dropdown"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export default function NavbarSimple() {
  const {IsLogin, SetIsLogin, SetUserId, SetUsername} = useUserStore();

  const verificationToken =async () => {

   try {
    const req = await axios.post("/api/auth/verify", {
      token: localStorage.getItem("token")
    })

    const res = await req.data;
    // console.log(res)

    if (res.type == "success") {
      SetIsLogin(true);
      SetUserId(res.user._id)
      SetUsername(res.user.username);
      
    }
  }
   catch(error){
    console.log(error);
  }
  }

  useEffect(() => {
    verificationToken();
  }, [])
  return (
    <header className="bg-[#09090b] border-b border-primary-foreground/10 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center">
              <span className="text-secondary-foreground font-bold">F</span>
            </div>
            <h1 className="text-xl font-bold text-white">Focusly</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
              Dashboard
            </Link>
            <Link href="#" className="text-secondary font-medium">
              Projects
            </Link>
            <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
              Teams
            </Link>
            <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
              Calendar
            </Link>
            <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
              Reports
            </Link>
          </nav>
          <div className="flex items-center gap-4">
           
            {
        !IsLogin?(
            <AvatarDropdown/>
        ):(
            <>
            <Button asChild>
            <Link href={"/login"}>
                Login
            </Link>
            </Button>
            <Button asChild>
            <Link href={"/login"}>
                Signup
            </Link>
            </Button>
            </>
        )
       }
          </div>
        </div>
      </header>
  )
}

function MenuIcon(props) {
  return
  (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

 