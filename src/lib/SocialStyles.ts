export function getSocialStyle(label: string) {
  switch (label.toLowerCase()) {
    case "github":
      return {
        bg: "#24292F",
        icon: "#FFFFFF",
      }

    case "linkedin":
      return {
        bg: "#0A66C2",
        icon: "#FFFFFF",
      }

    case "x":
    case "twitter":
      return {
        bg: "#000000",
        icon: "#FFFFFF",
      }

    case "email":
      return {
        bg: "#EA4335",
        icon: "#FFFFFF",
      }

    default:
      return {
        bg: "#6B7280",
        icon: "#FFFFFF",
      }
  }
}