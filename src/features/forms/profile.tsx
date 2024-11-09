"use client"

import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { profileInput } from "shared/types"
import { profileModel } from "shared/models"
import { profileSchema } from "shared/schemas"
import { FilePenLine, Trash2, X } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDeleteProfileAvatar, useGetUser, useUpdateProfileAvatar, useUpdateUser } from "shared/hooks"
import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, DatePicker, Avatar, AvatarFallback, AvatarImage } from "shared/ui"

interface IProps {
  userId: string;
}

export function ProfileForm({userId}: IProps) {
  const form = useForm<profileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: profileModel,
  })
  const {data: user} = useGetUser(userId);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const {mutate: updateUser, isPending: isUpdateUser} = useUpdateUser()
  const {mutate: deleteProfileAvatar, isPending: isDeleteProfileAvatar} = useDeleteProfileAvatar()
  const {mutate: updateProfileAvatar, isPending: isUpdateProfileAvatar} = useUpdateProfileAvatar()

  const handleButtonClick = () => {
    if(fileInputRef.current) fileInputRef.current.click();
  };

  const deleteChosenAvatar = () => {
    if(image) {
      setImage(null);
    } else {
      deleteProfileAvatar();
    }
  }

  const onSubmit = (values: profileInput) => {
    if(image) {
      updateProfileAvatar(image, {
        onSuccess: () => {
          setImage(null);
        }
      })
    }
    if(Object.values(values).some((el) => !!el)) {
      updateUser({...values, userId}, {
        onSuccess: () => {
          form.reset(profileModel)
        }
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  return (
    <Form {...form}>
      <div className="relative w-[130px] h-[130px]">
        <Avatar className="w-[130px] h-[130px]">
          <AvatarImage src={image ? URL.createObjectURL(image) : user?.images[0]?.url} />
          <AvatarFallback>{user?.firstName || ""}</AvatarFallback>
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
          onClick={deleteChosenAvatar}
          className={`${!(user?.images[0]?.id) && "hidden"} w-[30px] h-[30px] rounded-full p-0 absolute top-0 left-0`}
        >
          {
            image ? 
            <X className="text-white" size={15} /> :
            <Trash2 className="text-white" size={15} />
          }
        </Button>
      </div>
      <form 
        className="flex flex-col gap-[20px] w-full"
        onSubmit={form.handleSubmit(onSubmit)} 
      >
        <div className="max-sm:items-center flex flex-row max-md:flex-col gap-[20px]">
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 max-w-[400px] w-full">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="text"
                    value={field.value || ""}
                    placeholder={user?.firstName || "Joseph"}
                    onChange={(e) => field.onChange(e.target.value || undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 max-w-[400px] w-full">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="text"
                    value={field.value || ""}
                    placeholder={user?.lastName || "Hoffenhof"} 
                    onChange={(e) => field.onChange(e.target.value || undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="max-sm:items-center flex flex-row max-md:flex-col gap-[20px]">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 max-w-[400px] w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="email"
                    value={field.value || ""}
                    placeholder={user?.email || "email@gmail.com"} 
                    onChange={(e) => field.onChange(e.target.value || undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="dateOfBirth"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 max-w-[400px] w-full">
                <FormLabel>Date of birth</FormLabel>
                <FormControl>
                  <DatePicker 
                    onChange={field.onChange}
                    value={field.value ? new Date(field.value) : (user?.dateOfBirth ? new Date(user.dateOfBirth) : new Date())}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button 
          type="submit"
          className="w-fit ml-auto mt-[10px]"
          isLoading={isUpdateUser || isDeleteProfileAvatar || isUpdateProfileAvatar}
          disabled={!form.formState.isValid || isUpdateProfileAvatar || isDeleteProfileAvatar || isUpdateUser || (!(Object.values(form.watch()).some((el) => !!el)) && !image)}
        >Save</Button>
      </form>
    </Form>
  )
}
