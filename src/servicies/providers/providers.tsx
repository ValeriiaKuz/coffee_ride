"use client";
import { Provider } from "react-redux";
import { store } from "@/src/servicies/redux/store/store";
import ModalProvider from "./modal-provider";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ModalProvider>{children}</ModalProvider>
    </Provider>
  );
}
