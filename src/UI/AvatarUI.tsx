import React from "react";
import Image from "next/image";
import ProfileIcon from "@/UI/icons/profile";

interface IProps {
  size: number;
  avatar: string|null|undefined;
}

export function AvatarUI({avatar, size}: IProps) {
  if(avatar) {
    return (
      <Image
        width={size}
        src={avatar}
        height={size}
        alt="Profile avatar"
        className="rounded-full"
      />
    );
  }

  return (
    <div className="bg-[#F5F7FA] flex w-[60px] h-[60px] rounded-full items-center justify-center">
      <ProfileIcon width={35} height={35} color="#343C6A"/>
    </div>
  );
}