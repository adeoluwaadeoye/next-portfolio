'use client'

import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaXTwitter,
  FaLink,
} from "react-icons/fa6";

type Props = {
  name: string;
  size?: number;
  className?: string;
};

export default function SocialIcon({ name, size = 18, className }: Props) {
  const iconProps = {
    size,
    className: className ?? "text-current",
  };

  switch (name.toLowerCase()) {
    case "github":
      return <FaGithub {...iconProps} />;
    case "linkedin":
      return <FaLinkedin {...iconProps} />;
    case "x":
    case "twitter":
      return <FaXTwitter {...iconProps} />;
    case "email":
      return <FaEnvelope {...iconProps} />;
    default:
      return <FaLink {...iconProps} />;
  }
}