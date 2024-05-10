import React from "react";
import {IRoute} from "@/types/routes";
import {IIconProps} from "@/types/icon";
import HomeIcon from "@/UI/icons/pages/home";
import CardIcon from "@/UI/icons/pages/card";
// import StocksIcon from "@/UI/icons/pages/stocks";
import CryptoIcon from "@/UI/icons/pages/crypto";
import AccountsIcon from "@/UI/icons/pages/account";
import SettingsIcon from "@/UI/icons/pages/settings";
import TransactionsIcon from "@/UI/icons/pages/transaction";

export const routes: IRoute[] = [
  {
    href: "/",
    title: "Dashboard",
    pageTitle: "Overview",
    icon: (props: IIconProps) => <HomeIcon width={props.width} height={props.height} color={props.color}/>,
  },
  {
    href: "/transactions",
    title: "Transactions",
    pageTitle: "Transactions",
    icon: (props: IIconProps) => <TransactionsIcon width={props.width} height={props.height} color={props.color}/>,
  },
  {
    href: "/accounts",
    title: "Accounts",
    pageTitle: "Accounts",
    icon: (props: IIconProps) => <AccountsIcon width={props.width} height={props.height} color={props.color}/>,
  },
  {
    href: "/cards",
    title: "Cards",
    pageTitle: "Cards",
    icon: (props: IIconProps) => <CardIcon width={props.width} height={props.height} color={props.color}/>,
  },
  // {
  //   title: "Stocks",
  //   pageTitle: "Stocks",
  //   href: "/investments/stocks",
  //   icon: (props: IIconProps) => <StocksIcon width={props.width} height={props.height} color={props.color}/>,
  // },
  {
    title: "Cryptos",
    pageTitle: "Cryptos",
    href: "/investments/cryptos",
    icon: (props: IIconProps) => <CryptoIcon width={props.width} height={props.height} color={props.color}/>,
  },
  {
    href: "/settings",
    title: "Settings",
    pageTitle: "Settings",
    icon: (props: IIconProps) => <SettingsIcon width={props.width} height={props.height} color={props.color}/>,
  }
];