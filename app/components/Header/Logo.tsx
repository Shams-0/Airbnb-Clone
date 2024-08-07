"use client";

import Image from "next/image";
import { useRouter } from "next/navigation"

const Logo = () => {
  const router = useRouter()
  return (
    <Image
      onClick={() => router.push("/")}
      alt="Logo"
      className="hidden md:block cursor-pointer"
      src="/images/logo.png?timestamp=1"
      width="100"
      height="100"
      priority={true}
      style={{ width: "auto", height: "auto" }}
    />
  )
}

export default Logo