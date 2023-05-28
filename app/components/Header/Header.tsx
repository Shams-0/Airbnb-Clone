"use client"

import React from 'react'
import { User } from '@prisma/client'

import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import Categories from './Categories'
import Container from '@components/Container'

interface HeaderProps {
  currentUser?: User | null
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  return (
    <header className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </header>
  )
}

export default Header