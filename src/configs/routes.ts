import {IRoute} from "@/types/routes";

export const routes: IRoute[] = [
  {
    href: "/",
    title: "Dashboard",
    pageTitle: "Overview",
    // icon: (props: IIconProps) => <HomeIcon width={props.width} height={props.height} color={props.color}/>,
  },
  {
    href: "/transactions",
    title: "Transactions",
    pageTitle: "Transactions",
    // icon: (props: IIconProps) => <TransactionsIcon width={props.width} height={props.height} color={props.color}/>,
  },
  {
    href: "/accounts",
    title: "Accounts",
    pageTitle: "Accounts",
    // icon: (props: IIconProps) => <AccountsIcon width={props.width} height={props.height} color={props.color}/>,
  },
  {
    href: "/investments",
    title: "Investments",
    pageTitle: "Investments",
    // icon: (props: IIconProps) => <InvestmentsIcon width={props.width} height={props.height} color={props.color}/>,
  },
  {
    href: "/cards",
    title: "Cards",
    pageTitle: "Cards",
    // icon: (props: IIconProps) => <CreditCardIcon width={props.width} height={props.height} color={props.color}/>,
  },
  {
    href: "/settings",
    title: "Settings",
    pageTitle: "Settings",
    // icon: (props: IIconProps) => <SettingsIcon width={props.width} height={props.height} color={props.color}/>,
  }
];