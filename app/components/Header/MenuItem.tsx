"use client"

interface MenuItemProps {
  onClick: () => void,
  label: string
}

import { Menu } from '@headlessui/react'
import React from 'react'

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div className="py-1">
      <Menu.Item>
        <button onClick={onClick} className="group flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100">
          {label}
        </button>
      </Menu.Item>
    </div>
  )
}

export default MenuItem