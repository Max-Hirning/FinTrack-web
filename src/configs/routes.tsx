import React from "react";
import {IRoute} from "@/types/routes";
import HomeIcon from "@/UI/icons/home";
import CardIcon from "@/UI/icons/card";
import {IIconProps} from "@/types/icon";
import AccountsIcon from "@/UI/icons/account";
import SettingsIcon from "@/UI/icons/setting";
import InvestmentsIcon from "@/UI/icons/investment";
import TransactionsIcon from "@/UI/icons/transaction";

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
  {
    title: "Stocks",
    pageTitle: "Stocks",
    href: "/investments/stocks",
    icon: (props: IIconProps) => <InvestmentsIcon width={props.width} height={props.height} color={props.color}/>,
  },
  {
    title: "Cryptos",
    pageTitle: "Cryptos",
    href: "/investments/cryptos",
    icon: (props: IIconProps) => <InvestmentsIcon width={props.width} height={props.height} color={props.color}/>,
  },
  {
    href: "/settings",
    title: "Settings",
    pageTitle: "Settings",
    icon: (props: IIconProps) => <SettingsIcon width={props.width} height={props.height} color={props.color}/>,
  }
];