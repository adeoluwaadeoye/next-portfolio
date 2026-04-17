import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaEnvelope,
} from "react-icons/fa6"

import { X } from "lucide-react"

export type IconName =
  | "github"
  | "linkedin"
  | "x"
  | "email"
  | "close"

type IconProps = {
  name: IconName
  size?: number
  className?: string
  themeAware?: boolean
}

export default function Icon({
  name,
  size = 20,
  className = "",
  themeAware = true,
}: IconProps) {
  const base = themeAware ? "text-foreground" : ""

  const props = {
    size,
    className: `${base} ${className}`,
  }

  switch (name) {
    case "github":
      return <FaGithub {...props} />
    case "linkedin":
      return <FaLinkedin {...props} />
    case "x":
      return <FaXTwitter {...props} />
    case "email":
      return <FaEnvelope {...props} />
    case "close":
      return <X {...props} />
    default:
      return null
  }
}