"use client";

import { useRef } from "react";
import { Menu } from '@headlessui/react'
import { User } from "@prisma/client";
import { AiOutlineMenu } from "react-icons/ai"
import { signOut } from "next-auth/react"

import Avatar from "../Avatar";
import RegisterModal from "../modals/RegisterModal";
import LoginModal from "../modals/LoginModal";
import MenuItem from "./MenuItem";
import { ModalRef } from "@/app/types";

interface UserMenuProps {
  currentUser?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {

  const registerModalRef = useRef<ModalRef>(null);
  const loginModalRef = useRef<ModalRef>(null);

  const openRegisterModal = () => {
    registerModalRef.current?.isOpen(true)
  }
  const openLoginModal = () => {
    loginModalRef.current?.isOpen(true)
  }

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => { }}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          Airbnb your home
        </div>
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-sm transition">
            <AiOutlineMenu />
            <div className="hidden md:block">
              <Avatar />
            </div>
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {currentUser ?
              (
                <>
                  <MenuItem onClick={() => { }} label="My trips" />
                  <MenuItem onClick={() => { }} label="My favorites" />
                  <MenuItem onClick={() => { }} label="My reservations" />
                  <MenuItem onClick={() => { }} label="My properties" />
                  <MenuItem onClick={() => { }} label="Airbnb my home" />
                  <hr />
                  <MenuItem onClick={() => signOut()} label="Log out" />
                </>
              ) : (
                <>
                  <MenuItem onClick={openLoginModal} label="Login" />
                  <MenuItem onClick={openRegisterModal} label="Sign up" />
                </>
              )
            }

          </Menu.Items>
        </Menu>
        <LoginModal loginModalRef={loginModalRef} />
        <RegisterModal registerModalRef={registerModalRef} />
      </div>
    </div>
  )
}

export default UserMenu