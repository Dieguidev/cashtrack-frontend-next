import Image from "next/image"

export const Logo = () => {
  return (
    <Image
      src='/logo.svg'
      width={0}
      height={0}
      className="w-full"
      alt="logo"
      priority
    />
  )
}
