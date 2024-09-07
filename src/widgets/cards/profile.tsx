"use client";

import { useRef } from "react";
import { FilePenLine, Trash2 } from "lucide-react";
import { ProfileForm } from "features/forms/profile";
import { Avatar, AvatarFallback, AvatarImage, Button, Card } from "shared/ui";

interface IProps {
  styles?: string;
}

export function ProfileWidget({styles}: IProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (): void => {
    if(fileInputRef.current) fileInputRef.current.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      console.log(imageUrl);
    }
  };

  return (
    <Card className={`max-sm:flex-col max-sm:items-center max-w-[1040px] p-[24px] flex-row flex gap-[40px] ${styles || ""}`}>
      <div className="relative w-[130px] h-[130px]">
        <Avatar className="w-[130px] h-[130px]">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <label className="absolute bottom-0 right-0">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <Button onClick={handleButtonClick} className="w-[30px] h-[30px] rounded-full p-0">
            <FilePenLine className="text-white" size={15} />
          </Button>
        </label>
        <Button 
          variant="destructive" 
          className="w-[30px] h-[30px] rounded-full p-0 absolute top-0 left-0"
        >
          <Trash2 className="text-white" size={15} />
        </Button>
      </div>
      <ProfileForm/>
    </Card>
  )
}