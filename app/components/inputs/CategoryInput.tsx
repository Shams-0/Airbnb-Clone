"use client"

import React from 'react'
import { IconType } from 'react-icons'

interface CategoryInputProps {
  label: string
  icon: IconType
  selected?: boolean
  onClick: (value: string) => void
}

const CategoryInput: React.FC<CategoryInputProps> = ({ icon: Icon, label, selected, onClick }) => {
  return (
    <div className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-rose-500 hover:text-rose-500 transition cursor-pointer 
    ${selected ? "border-rose-500 text-rose-500" : "border-neutral-200"}`} onClick={() => onClick(label)}>
      <Icon size={30} />
      <p className="font-semibold">
        {label}
      </p>
    </div>
  )
}

export default CategoryInput