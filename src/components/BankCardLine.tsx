import CardIcon from "@/UI/icons/card";
import {ButtonUI} from "@/UI/ButtonUI";
import {setCard} from "@/modules/store";
import {useDispatch} from "react-redux";
import React, {ReactElement} from "react";
import {ICardResponse} from "@/modules/cards";
import {hexToRgba} from "@/controllers/colors";

interface IProps extends ICardResponse {
  userId: string;
}

export function BankCardLine({_id, userId, title, color, currency, balance, owner}: IProps): ReactElement {
  const dispatch = useDispatch();

  return (
    <div className="bg-white border border-[#DFEAF2] rounded-[25px] items-center w-full min-w-[700px] h-[90px] p-[20px] flex justify-between relative">
      <div
        style={{backgroundColor: hexToRgba(color, 0.25)}}
        className="rounded-[20px] w-[60px] h-[60px] flex items-center justify-center"
      >
        <CardIcon width={26} height={26} color={color}/>
      </div>
      <article className="w-[100px]">
        <p className="text-[16px] font-medium text-text">TITLE</p>
        <p className="title text-[15px] font-normal text-secondary">{title}</p>
      </article>
      <article className="w-[150px]">
        <p className="text-[16px] font-medium text-text">Card Number</p>
        <p className="title text-[15px] font-normal text-secondary">{_id.substring(0, 4)} **** **** {_id.substring(_id.length - 4)}</p>
      </article>
      <article className="w-[100px]">
        <p className="text-[16px] font-medium text-text">Namain Card</p>
        <p className="title text-[15px] font-normal text-secondary">{owner.firstName} {owner.lastName}</p>
      </article>
      <ButtonUI
        type="button"
        variant="text"
        styles="h-[40px] w-[120px]"
        disabled={userId !== owner._id}
        onClick={() => (userId === owner._id) && dispatch(setCard({_id, title, color, currency, balance}))}
      >View Details</ButtonUI>
    </div>
  );
}
