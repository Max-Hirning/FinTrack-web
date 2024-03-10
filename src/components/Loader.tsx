"use client";

import React from "react";
import {QueryKeys} from "@/configs/queryKeys";
import {useIsMutating} from "@tanstack/react-query";

export function Loader() {
  const isSignIn = useIsMutating({mutationKey: [QueryKeys.signIn]});
  const isSignUp = useIsMutating({mutationKey: [QueryKeys.signUp]});

  const isUpdateCard = useIsMutating({mutationKey: [QueryKeys.updateCard]});
  const isDeleteCard = useIsMutating({mutationKey: [QueryKeys.deleteCard]});
  const isCreateCard = useIsMutating({mutationKey: [QueryKeys.createCard]});

  const isUpdateUser = useIsMutating({mutationKey: [QueryKeys.updateUser]});
  const isDeleteUser = useIsMutating({mutationKey: [QueryKeys.deleteUser]});
  const isDeleteUserAvatar = useIsMutating({mutationKey: [QueryKeys.deleteUserAvatar]});
  const isUpdateUserSecurity = useIsMutating({mutationKey: [QueryKeys.updateUserSecurity]});
  
  const isUpdateTransaction = useIsMutating({mutationKey: [QueryKeys.updateTransaction]});
  const isDeleteTransaction = useIsMutating({mutationKey: [QueryKeys.deleteTransaction]});
  const isCreateTransaction = useIsMutating({mutationKey: [QueryKeys.createTransaction]});

  return (
    <div
      id="loaderBackdrop"
      className={`fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center ${!(isSignIn||isSignUp||isUpdateCard||isDeleteCard||isCreateCard||isCreateTransaction||isUpdateTransaction||isDeleteTransaction||isDeleteUserAvatar||isUpdateUser||isUpdateUserSecurity||isDeleteUser) && "hidden"}`}
    >
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}