import { Theme } from "@radix-ui/themes";
import { FC, PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <Theme appearance="dark">
    <ToastContainer />

    {children}
  </Theme>
);
