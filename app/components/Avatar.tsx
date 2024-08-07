"use client"

import Image from 'next/image'

interface AvatarProps {
  src: string | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image alt="avatar" height="30" width="30" src={src || "/images/placeholder.jpg"} className="rounded-full" />
  )
}

export default Avatar