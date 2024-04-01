"use client";

import {useFormik} from "formik";
import {InputUI} from "@/UI/InputUI";
import {ButtonUI} from "@/UI/ButtonUI";
import {AvatarUI} from "@/UI/AvatarUI";
import {SelectUI} from "@/UI/SelectUI";
import {signOut} from "next-auth/react";
import CloseIcon from "@/UI/icons/close";
import LogoutIcon from "@/UI/icons/logout";
import {ICurrency} from "@/types/currency";
import {useSession} from "next-auth/react";
import {IUserSession} from "../types/user";
import DeleteIcon from "@/UI/icons/delete";
import EditIcon from "@/UI/icons/editImage";
import {useUpdateUser} from "../hooks/updateUser";
import {useDeleteUser} from "../hooks/deleteUser";
import {ISettingsForm} from "../types/settingsForm";
import {settingsFormSchema} from "../schemas/settingsForm";
import {useDeleteUserAvatar} from "../hooks/deleteUserAvatar";
import {settingsFormInitialValues} from "../models/settingsForm";
import React, {useRef, ChangeEvent, useState, ReactElement} from "react";

interface IProps {
  session: IUserSession;
  currencies: ICurrency[];
}

export function SettingsForm({session, currencies}: IProps): ReactElement {
  const formik = useFormik({
    validationSchema: settingsFormSchema, 
    initialValues: settingsFormInitialValues,
    onSubmit: async (values: Omit<ISettingsForm, "image">, {resetForm}): Promise<void> => {
      updateUser.mutate({...values, image: imageFile});
      setImageFile(null);
      resetForm();
    },
  });
  const {data} = useSession();
  const deleteUser = useDeleteUser();
  const updateUser = useUpdateUser();
  const avatarHasBeenChanged = useRef(false);
  const currencyHasBeenChanged = useRef(false);
  const deleteAvatarUser = useDeleteUserAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File|null>(null);
  const [iconColor, setIconColor] = useState<"white"|"#ef4444">("#ef4444");
  
  const handleButtonClick = (): void => {
    if(fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if(event.target.files) {
      const file = event.target.files[0];
      if(file) {
        avatarHasBeenChanged.current = true;
        setImageFile(file);
      }
    }
  };

  return (
    <>
      <ButtonUI
        type="button"
        variant="text"
        color="danger"
        title="Log out"
        onClick={() => signOut()}
        onMouseEnter={() => setIconColor("white")}
        onMouseLeave={() => setIconColor("#ef4444")}
        styles="sm:w-[120px] max-sm:w-[40px] h-[40px] justify-evenly max-sm:rounded-full absolute top-[25px] right-[25px]"
      >
        <LogoutIcon 
          width={25} 
          height={25} 
          color={iconColor}
        />
        <span className="max-sm:hidden">Log out</span>
      </ButtonUI>
      <div className="relative w-fit">
        <AvatarUI
          size={150}
          avatar={imageFile ? URL.createObjectURL(imageFile) : ((data?.user as IUserSession)?.avatar || session.avatar)}
        />
        <input 
          type="file" 
          id="fileInput"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <ButtonUI
          type="button"
          title="Edit avatar"
          variant="contained"
          onClick={handleButtonClick}
          styles="w-[30px] h-[30px] absolute top-0 right-0 rounded-full"
        >
          <EditIcon width={15} height={15} color="white"/>
        </ButtonUI>
        <ButtonUI
          type="button"
          color="danger"
          onClick={() => {
            setImageFile(null);
            avatarHasBeenChanged.current = false;
          }}
          variant="contained"
          title="Cancel avatar choice"
          styles={`w-[30px] h-[30px] top-0 left-0 absolute rounded-full ${!(imageFile) && "hidden"}`}
        >
          <CloseIcon width={20} height={20} color="white"/>
        </ButtonUI>
        <ButtonUI
          type="button"
          color="danger"
          variant="contained"
          title="Delete avatar"
          onClick={() => deleteAvatarUser.mutate()}
          styles={`w-[30px] h-[30px] bottom-0 right-0 absolute rounded-full ${!((data?.user as IUserSession)?.avatar) && "hidden"}`}
        >
          <DeleteIcon width={20} height={20} color="white"/>
        </ButtonUI>
      </div>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          formik.submitForm();
        }}
        className="flex w-full flex-col gap-[20px] mt-[30px]"
      >
        <fieldset className="flex max-lg:flex-col gap-[25px]">
          <InputUI
            type="text"
            id="firstName"
            label="First Name"
            autoComplete="given-name"
            onBlur={formik.handleBlur}
            styles="w-full max-w-[320px]"
            value={formik.values.firstName}
            changeText={formik.handleChange}
            errorMsg={formik.errors.firstName}
            error={!!(formik.errors.firstName && formik.errors.firstName)}
            placeholder={(data?.user as IUserSession)?.firstName || session.firstName}
          />
          <InputUI
            type="text"
            id="lastName"
            label="Last Name"
            autoComplete="family-name"
            onBlur={formik.handleBlur}
            styles="w-full max-w-[320px]"
            value={formik.values.lastName}
            changeText={formik.handleChange}
            errorMsg={formik.errors.lastName}
            error={!!(formik.errors.lastName && formik.errors.lastName)}
            placeholder={(data?.user as IUserSession)?.lastName || session.lastName}
          />
        </fieldset>
        <fieldset className="flex max-lg:flex-col gap-[25px]">
          <InputUI
            id="email"
            type="email"
            label="Email"
            autoComplete="email"
            onBlur={formik.handleBlur}
            value={formik.values.email}
            styles="w-full max-w-[320px]"
            errorMsg={formik.errors.email}
            changeText={formik.handleChange}
            error={!!(formik.errors.email && formik.errors.email)}
            placeholder={(data?.user as IUserSession)?.email || session.email}
          />
          <SelectUI
            type="text"
            id="currency"
            changeText={(e) => {
              formik.handleChange(e);
              currencyHasBeenChanged.current = true;
            }}
            autoComplete="off"
            label="Card Currency"
            listId="currencies-list"
            onBlur={formik.handleBlur}
            styles="w-full max-w-[320px]"
            value={formik.values.currency}
            errorMsg={formik.errors.currency}
            error={!!(formik.errors.currency && formik.errors.currency)}
            placeholder={(data?.user as IUserSession)?.currency || session.currency}
          >
            <datalist id="currencies-list">
              {
                currencies.map(({code, name}: ICurrency) => {
                  return (
                    <option 
                      key={code}
                      value={code} 
                    >{name}</option>
                  );
                })
              }
            </datalist>
          </SelectUI>
        </fieldset>
        <div className="flex gap-[25px] justify-between items-center mt-[25px]">
          <ButtonUI
            type="button"
            color="danger"
            variant="outlined"
            title="Delete profile"
            styles="w-full max-w-[190px] h-[50px]"
            onClick={() => deleteUser.mutate()}
          >Delete</ButtonUI>
          <ButtonUI
            type="submit"
            variant="contained"
            title="Save profile changes"
            styles="w-full max-w-[190px] h-[50px]"
            disabled={!((formik.isValid && Object.values(formik.values).some((el) => el.length > 0)) || (currencyHasBeenChanged.current) || (avatarHasBeenChanged.current))}
          >Save</ButtonUI>
        </div>
      </form>
    </>
  );
}