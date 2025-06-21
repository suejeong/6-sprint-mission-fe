import { ReactNode } from "react";
import MarketLayout from "../../../items/layout";

export default function Layout({ children } : {children: ReactNode}) {
    return <MarketLayout>{children}</MarketLayout>;
}