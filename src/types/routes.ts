import {ReactNode} from "react";
import {IIconProps} from "./icon";

export interface IRoute {
  href: string;
  title: string;
  pageTitle: string;
  icon: (props: IIconProps) => ReactNode;
}