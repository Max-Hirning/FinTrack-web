"use client";

import {LoaderUI} from "@/UI/LoaderUI";
import React, {ReactElement} from "react";
import {QueryKeys} from "@/configs/queryKeys";
import {useIsMutating} from "@tanstack/react-query";

export function Loader(): ReactElement {
  const isSignIn = useIsMutating({mutationKey: [QueryKeys.signIn]});
  const isSignUp = useIsMutating({mutationKey: [QueryKeys.signUp]});
  const isResetPassword = useIsMutating({mutationKey: [QueryKeys.resetPassword]});
  const isForgotPassword = useIsMutating({mutationKey: [QueryKeys.forgotPassword]});
  
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
      className={`fixed inset-0 bg-black bg-opacity-25 z-20 flex items-center justify-center ${!(isResetPassword||isForgotPassword||isSignIn||isSignUp||isUpdateCard||isDeleteCard||isCreateCard||isCreateTransaction||isUpdateTransaction||isDeleteTransaction||isDeleteUserAvatar||isUpdateUser||isUpdateUserSecurity||isDeleteUser) && "hidden"}`}
    >
      <LoaderUI/>
    </div>
  );
}