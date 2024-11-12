import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CustomAvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: string;
}

export function CustomAvatar({
  src = "",
  alt = "Avatar",
  fallback = "NA",
  size = "w-10 h-10", // Default size
}: CustomAvatarProps) {
  return (
    <Avatar className={size}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
