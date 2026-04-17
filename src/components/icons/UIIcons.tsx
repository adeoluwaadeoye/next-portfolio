'use client'

import { X } from 'lucide-react'

export type UIIconName = 'close'

type Props = {
  name: UIIconName
  size?: number
  className?: string
}

export default function UIIcon({
  name,
  size = 18,
  className = '',
}: Props) {
  switch (name) {
    case 'close':
      return <X size={size} className={className} />
    default:
      return null
  }
}