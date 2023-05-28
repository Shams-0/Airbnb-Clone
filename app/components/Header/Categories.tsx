"use client"

import React from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

import { categories } from '@utils/index'
import Container from '@components/Container'
import CategoryBox from '@components/CategoryBox'

const Categories = () => {
  const pathname = usePathname()
  const params = useSearchParams()
  const category = params?.get("category")
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null
  }

  return (
    <Container>
      <div className="pt-4 flex items-center justify-between overflow-x-auto" id="scrollbar">
        {categories.map((item, index) => (
          <CategoryBox key={index} label={item.label} icon={item.icon} selected={category === item.label} />
        ))}
      </div>
    </Container>
  )
}

export default Categories