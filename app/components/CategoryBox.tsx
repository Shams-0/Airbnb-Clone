"use client"

import React, { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import qs from "query-string"
import { IconType } from 'react-icons/lib'

interface CategoryBoxProps {
  label: string
  icon: IconType
  description?: string
  selected?: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ label, icon: Icon, selected }) => {

  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString())
    }
    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }
    if (params?.get("category") === label) {
      delete updatedQuery.category
    }
    const url = qs.stringifyUrl({
      url: "/",
      query: updatedQuery
    }, { skipNull: true })

    router.push(url)
  }, [label, params, router])

  return (
    <div onClick={handleClick} className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-rose-500 transition cursor-pointer 
    ${selected ? " border-b-rose-500 text-rose-500" : "border-transparent text-neutral-500"}`}>
      <Icon size={26} />
      <p className="font-medium text-sm">{label}</p>
    </div>
  )
}

export default CategoryBox