"use client";

import { useCallback, useRef } from "react";
import { Menu } from '@headlessui/react'
import { User } from "@prisma/client";
import { AiOutlineMenu } from "react-icons/ai"
import { signOut } from "next-auth/react"

import MenuItem from "./MenuItem";
import Avatar from "@components/Avatar";
import RentModal from "@modals/RentModal";
import LoginModal from "@modals/LoginModal";
import RegisterModal from "@modals/RegisterModal";
import useRegisterModal from '@hooks/useRegisterModal'
import useLoginModal from "@hooks/useLoginModal";
import useRentModal from "@hooks/useRentModal";


interface UserMenuProps {
  currentUser?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {

  const rentModal = useRentModal();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }
    // Open Rent Modal
    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          Airbnb your home
        </div>
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-sm transition">
            <AiOutlineMenu />
            <div className="hidden md:block">
              <Avatar src={currentUser?.image} />
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
                  <MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
                  <hr />
                  <MenuItem onClick={() => signOut()} label="Log out" />
                </>
              ) : (
                <>
                  <MenuItem onClick={loginModal.onOpen} label="Login" />
                  <MenuItem onClick={registerModal.onOpen} label="Sign up" />
                </>
              )
            }

          </Menu.Items>
        </Menu>
        <LoginModal />
        <RegisterModal />
        <RentModal />
      </div>
    </div>
  )
}

export default UserMenu