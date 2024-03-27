import Image from "next/image";
import React, {ReactElement} from "react";
import ProfileIcon from "@/UI/icons/profile";

interface IProps {
  size: number;
  avatar: string|null|undefined;
}

export function AvatarUI({avatar, size}: IProps): ReactElement {
  if(avatar) {
    return (
      <Image
        width={size}
        src={avatar}
        height={size}
        alt="Profile avatar"
        style={{width: `${size}px`, height: `${size}px`}}
        className="rounded-full border border-[#DFEAF2]"
      />
    );
  }

  return (
    <div 
      style={{width: `${size}px`, height: `${size}px`}}
      className="bg-[#F5F7FA] flex rounded-full items-center justify-center"
    >
      <ProfileIcon width={size/1.25} height={size/1.25} color="#343C6A"/>
    </div>
  );
}